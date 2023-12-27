import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionService } from './competition.service';
import { Inject } from '@nestjs/common';
import { CreateCompetition } from './competition.types';
import { User } from 'src/auth/user/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

@Resolver(() => Competition)
export class CompetitionResolver {
  @Inject()
  private competitionService: CompetitionService;

  @Query(() => [Competition], { name: 'competitions' })
  async findAll(): Promise<Competition[]> {
    return this.competitionService.findAll();
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
