import {
  Args,
  ID,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EGTJudgingDevice } from './egtJudging.types';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { Inject } from '@nestjs/common';
import { EGTJudgingService } from './egtJudging.service';
import { EGTDevice } from '../device/egtDevice.entity';

Resolver(() => EGTJudgingDevice);
export class EGTJudgingResolver {
  @Inject()
  private readonly egtJudgingService: EGTJudgingService;

  @Role(ROLES.VIEWER)
  @Query(() => [EGTJudgingDevice], { name: 'egtJudgingDevices' })
  async getDivisionJudging(
    @Args('ids', { type: () => [ID] }) ids: number[],
    @Args('round', { type: () => Int }) round: number,
  ): Promise<EGTJudgingDevice[]> {
    return this.egtJudgingService.getJudging(ids, round);
  }

  @Role(ROLES.VIEWER)
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
