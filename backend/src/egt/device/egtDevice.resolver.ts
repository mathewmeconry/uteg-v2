import { Query, Args, Resolver, ID } from '@nestjs/graphql';
import { EGTDevice } from './egtDevice.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EGTDeviceGuard } from './egtDevice.guard';
import { EGTDeviceService } from './egtDevice.service';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';

@Resolver(() => EGTDevice)
@UseGuards(EGTDeviceGuard, RoleGuard)
export class EGTDeviceResolver {
  @Inject()
  private readonly egtDeviceService: EGTDeviceService;

  @Role(ROLES.VIEWER)
  @Query(() => [EGTDevice], { name: 'egtDevices' })
  async devices(
    @Args('competitionID', { type: () => ID }) competitionID: number,
  ): Promise<EGTDevice[]> {
    return this.egtDeviceService.findForCompetition(competitionID);
  }
}
