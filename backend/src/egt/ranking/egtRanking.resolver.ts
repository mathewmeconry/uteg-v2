import {
  Args,
  Parent,
  ResolveField,
  Resolver,
  Query,
  ID,
} from '@nestjs/graphql';
import { EGTStarterRanking } from './egtRanking.types';
import { Role } from 'src/auth/decorators/role.decorator';
import { Inject, UseGuards } from '@nestjs/common';
import { EGTRankingGuard } from './egtRanking.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/auth/types';
import { SEX } from 'src/base/starter/starter.types';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { Grade } from 'src/base/grade/grade.entity';
import { EGTRankingService } from './egtRanking.service';

@Resolver(() => EGTStarterRanking)
@UseGuards(EGTRankingGuard, RoleGuard)
export class EGTRankingResolver {
  @Inject()
  private readonly rankingService: EGTRankingService;

  @Role(ROLES.VIEWER)
  @Query(() => [EGTStarterRanking], { name: 'egtStarterRankings' })
  async getStarterRanking(
    @Args('competitionID', { type: () => ID }) competitionID: number,
    @Args('sex', { type: () => SEX }) sex: SEX,
    @Args('category') category: number,
  ): Promise<EGTStarterRanking[]> {
    return this.rankingService.getRanking(competitionID, sex, category);
  }

  @ResolveField(() => EGTStarterLink)
  async egtStarterlink(
    @Parent() ranking: EGTStarterRanking,
  ): Promise<EGTStarterLink> {
    return ranking.egtStarterlink;
  }

  @ResolveField(() => [Grade])
  async grades(@Parent() ranking: EGTStarterRanking): Promise<Grade[]> {
    return ranking.grades;
  }
}
