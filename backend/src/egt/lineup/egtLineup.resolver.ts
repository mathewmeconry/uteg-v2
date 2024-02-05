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

@Resolver(EGTLineup)
@UseGuards(EGTLineupGuard, RoleGuard)
export class EGTLineupResolver {
  @Inject()
  private readonly egtLineupService: EGTLineupService;

  @Inject()
  private readonly egtDivisionService: EGTDivisionService;

  @Role(ROLES.VIEWER)
  @Query(() => EGTLineup, { nullable: true, name: 'egtLineup' })
  async findOne(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<EGTLineup | null> {
    return this.egtLineupService.findOne(id);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTLineup, { name: 'egtLineupAdvanceRound' })
  async advanceRound(
    @Args('id', { type: () => ID }) id: number,
    @Args('round') round: number,
    @Args('override', { nullable: true, defaultValue: false })
    override: boolean = false,
  ): Promise<EGTLineup> {
    const lineup = await this.egtLineupService.findOne(id);
    if (!lineup) {
      throw new NotFoundException();
    }
    await this.egtLineupService.advanceRound(id, round, override);
    const division = await lineup.division;
    await this.egtDivisionService.advanceDivision(division.id);
    return lineup;
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => [EGTLineup], { name: 'egtLineupAdvanceRounds' })
  async advanceRounds(
    @Args('ids', { type: () => [ID] }) ids: number[],
    @Args('round') round: number,
    @Args('override', { nullable: true, defaultValue: false })
    override: boolean = false,
  ): Promise<EGTLineup[]> {
    const lineups = await this.egtLineupService.advanceRounds(
      ids,
      round,
      override,
    );
    const divisions = await Promise.all(
      lineups.map((lineup) => lineup.division),
    );

    // dedup devisions array by ids
    const uniqueDivisions = divisions.filter(
      (division, index) =>
        divisions.findIndex((div) => div.id === division.id) === index,
    );
    await uniqueDivisions.forEach(async (division) => {
      await this.egtDivisionService.advanceDivision(division.id);
    });

    return lineups;
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
