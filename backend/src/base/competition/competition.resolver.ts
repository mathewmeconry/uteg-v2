import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionService } from './competition.service';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import {
  CompetitionStats,
  CreateCompetitionInput,
  UpdateCompetitionInput,
} from './competition.types';
import { User } from 'src/auth/user/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { UserService } from 'src/auth/user/user.service';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CompetitionGuard } from './competition.guard';
import { ClubService } from '../club/club.service';
import { StarterLinkService } from '../starterLink/starterLink.service';
import { GradeService } from '../grade/grade.service';

@Resolver(() => Competition)
@UseGuards(CompetitionGuard, RoleGuard)
export class CompetitionResolver {
  @Inject()
  private competitionService: CompetitionService;

  @Inject()
  private userService: UserService;

  @Inject()
  private clubService: ClubService;

  @Inject()
  private starterLinkService: StarterLinkService;

  @Inject()
  private gradeService: GradeService;

  @Query(() => [Competition], { name: 'competitions' })
  async findAll(@CurrentUser() user: User): Promise<Competition[]> {
    const linked = await this.userService.findLinked(user.id);
    return Promise.all(linked.map(async (linked) => await linked.competition));
  }

  @Query(() => Competition, { name: 'competition' })
  @Role(ROLES.JUDGE)
  async findById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Competition> {
    return this.competitionService.findOne(id);
  }

  @Mutation(() => Competition, { name: 'createCompetition' })
  async create(
    @CurrentUser() user: User,
    @Args('competition') competitionData: CreateCompetitionInput,
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

  @Mutation(() => Competition, { name: 'updateCompetition' })
  @Role(ROLES.ADMIN)
  async update(
    @Args('id', { type: () => ID }) id: number,
    @Args('data', { type: () => UpdateCompetitionInput })
    data: UpdateCompetitionInput,
  ): Promise<Competition> {
    let competition = await this.competitionService.findOne(id);
    if (!competition) {
      throw new NotFoundException();
    }

    if (data.name) {
      competition.name = data.name;
    }
    if (data.location) {
      competition.location = data.location;
    }
    if (data.startDate) {
      competition.startDate = data.startDate;
    }
    if (data.endDate) {
      competition.endDate = data.endDate;
    }
    if (data.grounds) {
      competition.grounds = data.grounds;
    }
    if (data.modules) {
      competition.modules = data.modules;
    }
    return this.competitionService.save(competition);
  }

  @ResolveField(() => CompetitionStats)
  async stats(@Parent() competition: Competition): Promise<CompetitionStats> {
    return {
      clubs: await this.clubService.countClubs(competition.id),
      grades: await this.gradeService.countGrades(competition.id),
      starters: await this.starterLinkService.countStarters(competition.id),
    };
  }
}
