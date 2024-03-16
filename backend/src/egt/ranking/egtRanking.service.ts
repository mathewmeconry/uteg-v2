import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SEX } from 'src/base/starter/starter.types';
import { Award, EGTStarterRanking } from './egtRanking.types';
import { EGTDivisionService } from '../division/egtDivision.service';
import { EGTDivisionStates } from '../division/egtDivision.types';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { GradeService } from 'src/base/grade/grade.service';
import { Grade } from 'src/base/grade/grade.entity';
import { EGTSettingsService } from '../settings/egtSettings.service';

@Injectable()
export class EGTRankingService {
  @Inject()
  private readonly divisionService: EGTDivisionService;

  @Inject()
  private readonly gradeService: GradeService;

  @Inject()
  private readonly settingsService: EGTSettingsService;

  public async getRanking(
    competitionID: number,
    sex: SEX,
    category: number,
  ): Promise<EGTStarterRanking[]> {
    const divisions = await this.divisionService.findAll({
      competitionID,
      sex,
      category,
      state: EGTDivisionStates.ENDED,
    });

    const lineups = (
      await Promise.all(divisions.map((division) => division.lineups))
    ).flat();
    const egtStarterLinks = (
      await Promise.all(lineups.map((lineup) => lineup.starterlinks))
    ).flat();
    const starterRankings = await Promise.all(
      egtStarterLinks.map((egtStarterLink) =>
        this.createStarterRanking(egtStarterLink),
      ),
    );

    const starterRankingsSorted = starterRankings.sort(
      this.startersSort.bind(this),
    );
    const starterRankingRanked = this.applyRank(starterRankingsSorted);
    const categorySettings =
      await this.settingsService.getCategorySettingsByCompetitionID(
        competitionID,
        category,
        sex,
      );
    if (!categorySettings) {
      throw new NotFoundException();
    }

    return this.applyAward(
      starterRankingRanked,
      categorySettings.honourPrecentage,
    );
  }

  public async createStarterRanking(
    egtStarterlink: EGTStarterLink,
  ): Promise<EGTStarterRanking> {
    const starterRanking = new EGTStarterRanking();
    starterRanking.egtStarterlink = egtStarterlink;

    const starterlink = await egtStarterlink.starterLink;
    starterRanking.grades = await this.gradeService.findForStarter(
      starterlink.id,
    );
    const totalRounds = (await egtStarterlink.division).totalRounds;
    for (let i = 0; i < totalRounds; i++) {
      const grade = starterRanking.grades.find((g) => g.deviceNumber === i);
      if (!grade) {
        const grade = new Grade();
        grade.id = -1;
        grade.deviceNumber = i;
        (grade.module = 'egt'),
          (grade.starterlink = Promise.resolve(starterlink));
        grade.value = parseFloat('0.00');
        starterRanking.grades.push(grade);
      }
    }

    starterRanking.total = starterRanking.grades.reduce(
      (prev, curr) => prev + parseFloat(curr.value.toString()),
      0,
    );
    starterRanking.rank = 0;
    starterRanking.award = Award.NONE;

    return starterRanking;
  }

  private startersSort(prev: EGTStarterRanking, next: EGTStarterRanking) {
    if (prev.total !== next.total) {
      return next.total - prev.total;
    }

    for (let i = 0; i < prev.grades.length; i++) {
      const prevGrade = this.getGrade(prev, i);
      const nextGrade = this.getGrade(next, i);
      if (!prevGrade || !nextGrade) {
        return 0;
      }

      if (prevGrade.value !== nextGrade.value) {
        return nextGrade.value - prevGrade.value;
      }
    }
  }

  private getGrade(ranking: EGTStarterRanking, deviceNumber: number) {
    return ranking.grades.find((grade) => grade.deviceNumber === deviceNumber);
  }

  /**
   * Applies rank to each ranking. Exepects the function to be sorted by total
   *
   * @private
   * @param {EGTStarterRanking[]} rankings
   * @return {*}  {EGTStarterRanking[]}
   * @memberof EGTRankingService
   */
  private applyRank(rankings: EGTStarterRanking[]): EGTStarterRanking[] {
    let rank = 1;
    let prev: EGTStarterRanking;
    for (const ranking of rankings) {
      if (prev && prev.total === ranking.total) {
        ranking.rank = prev.rank;
      } else {
        ranking.rank = rank;
      }
      rank++;
      prev = ranking;
    }

    return rankings;
  }

  /**
   * Applies award to each ranking. Exepects the function to be sorted by total and ranks applied
   *
   * @private
   * @param {EGTStarterRanking[]} rankings
   * @param {number} categoryHonourPrecentage
   * @return {*}  {EGTStarterRanking[]}
   * @memberof EGTRankingService
   */
  private applyAward(
    rankings: EGTStarterRanking[],
    categoryHonourPrecentage: number,
  ): EGTStarterRanking[] {
    const maxHonour = Math.round(
      (rankings.length / 100) * categoryHonourPrecentage,
    );
    for (const ranking of rankings) {
      switch (ranking.rank) {
        case 1:
          ranking.award = Award.GOLD;
          break;
        case 2:
          ranking.award = Award.SILVER;
          break;
        case 3:
          ranking.award = Award.BRONZE;
          break;
        default:
          if (ranking.rank <= maxHonour) {
            ranking.award = Award.HONOUR;
          }
          break;
      }
    }
    return rankings;
  }
}
