import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EGTLineup } from './egtLineup.entity';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { EGTLineupGuard } from './egtLineup.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { EGTLineupService } from './egtLineup.service';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { EGTDevice } from '../device/egtDevice.entity';
import { EGTDivisionService } from '../division/egtDivision.service';
import { Judge } from 'src/auth/decorators/judge.decorator';

@Resolver(EGTLineup)
@UseGuards(EGTLineupGuard, RoleGuard)
export class EGTLineupResolver {
  @Inject()
  private readonly egtLineupService: EGTLineupService;

  @Inject()
  private readonly egtDivisionService: EGTDivisionService;

  @Role(ROLES.JUDGE)
  @Query(() => EGTLineup, { nullable: true, name: 'egtLineup' })
  async findOne(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<EGTLineup | null> {
    return this.egtLineupService.findOne(id);
  }

  @ResolveField(() => [EGTStarterLink])
  async starterlinks(@Parent() lineup: EGTLineup): Promise<EGTStarterLink[]> {
    return lineup.starterlinks;
  }

  @ResolveField(() => EGTDevice)
  async device(@Parent() lineup: EGTLineup): Promise<EGTDevice> {
    return lineup.device;
  }
}
