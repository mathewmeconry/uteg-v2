import { Inject, Injectable } from '@nestjs/common';
import { EGTDeviceService } from '../device/egtDevice.service';
import { EGTDivisionService } from '../division/egtDivision.service';
import { EGTLineupService } from '../lineup/egtLineup.service';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { EGTJudgingDevice } from './egtJudging.types';
import { EGTLineup } from '../lineup/egtLineup.entity';

@Injectable()
export class EGTJudgingService {
  @Inject()
  private egtDivisionService: EGTDivisionService;

  @Inject()
  private egtLineupService: EGTLineupService;

  @Inject()
  private egtDeviceService: EGTDeviceService;

  async getJudging(
    divisionIds: number[],
    round: number,
  ): Promise<EGTJudgingDevice[]> {
    const divisions = await this.egtDivisionService.findMany(divisionIds);

    // only include divisions that have that many rounds
    const divisionsFiltered = divisions.filter(
      (division) => round < division.totalRounds,
    );
    const maxRounds = Math.max(...divisionsFiltered.map((d) => d.totalRounds));

    const deviceBundles: EGTJudgingDevice[] = [];
    for (let device = 0; device < maxRounds; device++) {
      deviceBundles.push(
        await this.getJudgingForDevice(divisionIds, round, device),
      );
    }

    return deviceBundles;
  }

  async getJudgingForDevice(
    divisionIds: number[],
    round: number,
    device: number,
  ): Promise<EGTJudgingDevice> {
    const divisions = await this.egtDivisionService.findMany(divisionIds);

    // only include divisions that have that many rounds
    const divisionsFiltered = divisions.filter(
      (division) => round < division.totalRounds,
    );
    let starters: EGTStarterLink[] = [];
    const lineups: EGTLineup[] = [];
    for (const division of divisionsFiltered) {
      let deviceNumber = device - round;
      if (deviceNumber < 0) {
        deviceNumber += division.totalRounds;
      }
      deviceNumber %= division.totalRounds;

      const lineup = await this.egtLineupService.findForDivisionAndDeviceNumber(
        division.id,
        deviceNumber,
      );
      if (lineup) {
        starters.push(...(await lineup.starterlinks));
        lineups.push(lineup);
      }
    }

    starters = this.rollList(starters, round);

    const competition = await divisions[0].competition;
    return {
      device: await this.egtDeviceService.findForNumber(competition.id, device),
      round,
      starterslist: starters,
      lineups,
    };
  }

  rollList(list: EGTStarterLink[], round: number): EGTStarterLink[] {
    if (list.length === 0) {
      return [];
    }

    if (round > list.length) {
      round = list.length - round;
    }

    const removed = list.splice(0, round);
    return [...list, ...removed];
  }
}
