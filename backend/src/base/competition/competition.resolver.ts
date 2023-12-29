import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionService } from './competition.service';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateCompetition } from './competition.types';
import { User } from 'src/auth/user/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { UserService } from 'src/auth/user/user.service';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CompetitionGuard } from './competition.guard';

@Resolver(() => Competition)
@UseGuards(CompetitionGuard, RoleGuard)
export class CompetitionResolver {
  @Inject()
  private competitionService: CompetitionService;

  @Inject()
  private userService: UserService;

  @Query(() => [Competition], { name: 'competitions' })
  async findAll(@CurrentUser() user: User): Promise<Competition[]> {
    const linked = await this.userService.findLinked(user.id);
    return Promise.all(linked.map(async (linked) => await linked.competition));
  }

  @Query(() => Competition, { name: 'competition' })
  @Role(ROLES.VIEWER)
  async findById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Competition> {
    return this.competitionService.findOne(id);
  }

  @Mutation(() => Competition, { name: 'createCompetition' })
  async create(
    @CurrentUser() user: User,
    @Args('competition') competitionData: CreateCompetition,
  ): Promise<Competition> {
    let competition = new Competition();
    competition.name = competitionData.name;
    competition.location = competitionData.location;
    competition.startDate = competitionData.startDate;
    competition.endDate = competitionData.endDate;
    competition.grounds = competitionData.grounds;
    competition.modules = competitionData.modules;
    return this.competitionService.create(competition, user);
  }
}
