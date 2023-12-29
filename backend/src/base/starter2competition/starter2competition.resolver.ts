import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Starter2Competition } from './starter2competition.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { Starter2CompetitionService } from './starter2competition.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/auth/types';
import { Role } from 'src/auth/decorators/role.decorator';
import { Starter2CompetitionGuard } from './starter2competition.guard';
import { CreateStarterLinkInput } from './starter2competition.types';
import { StarterService } from '../starter/starter.service';
import { ClubService } from '../club/club.service';
import { CompetitionService } from '../competition/competition.service';

@Resolver(() => Starter2Competition)
@UseGuards(Starter2CompetitionGuard, RoleGuard)
export class Starter2CompetitionResolver {
  @Inject()
  private starter2competitionService: Starter2CompetitionService;

  @Inject()
  private starterService: StarterService;

  @Inject()
  private clubService: ClubService;

  @Inject()
  private competitionService: CompetitionService;

  @Role(ROLES.VIEWER)
  @Query(() => Starter2Competition, {
    name: 'starter2competition',
    nullable: true,
  })
  async findById(@Args('id') id: number): Promise<Starter2Competition | null> {
    return this.starter2competitionService.findOne(id);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => Starter2Competition, { name: 'createStarterLink' })
  async link(
    @Args('data') linkData: CreateStarterLinkInput,
  ): Promise<Starter2Competition> {
    const starter2competition = new Starter2Competition();
    starter2competition.starter = Promise.resolve(
      await this.starterService.findOne(linkData.starterID),
    );
    starter2competition.club = Promise.resolve(
      await this.clubService.findOne(linkData.clubID),
    );
    starter2competition.competition = Promise.resolve(
      await this.competitionService.findOne(linkData.competitionID),
    );
    starter2competition.category = linkData.category;
    return this.starter2competitionService.create(starter2competition);
  }
}
