import { Args, ID, Int, Query, Resolver } from '@nestjs/graphql';
import { EGTJudgingDevice } from './egtJudging.types';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { Inject, UseGuards } from '@nestjs/common';
import { EGTJudgingService } from './egtJudging.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EGTJudgingGuard } from './egtJudging.guard';

Resolver(() => EGTJudgingDevice);
@UseGuards(EGTJudgingGuard, RoleGuard)
export class EGTJudgingResolver {
  @Inject()
  private readonly egtJudgingService: EGTJudgingService;

  @Role(ROLES.JUDGE)
  @Query(() => [EGTJudgingDevice], { name: 'egtJudgingDevices' })
  async getDivisionJudging(
    @Args('ids', { type: () => [ID] }) ids: number[],
    @Args('round', { type: () => Int }) round: number,
  ): Promise<EGTJudgingDevice[]> {
    return this.egtJudgingService.getJudging(ids, round);
  }

  @Role(ROLES.JUDGE)
  @Query(() => EGTJudgingDevice, {
    name: 'egtJudgingDevice',
  })
  async getDivisionJudgingForDevice(
    @Args('ids', { type: () => [ID] }) ids: number[],
    @Args('round', { type: () => Int }) round: number,
    @Args('device', { type: () => Int }) device: number,
  ): Promise<EGTJudgingDevice> {
    return this.egtJudgingService.getJudgingForDevice(ids, round, device);
  }
}
