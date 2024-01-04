import {
  Args,
  Resolver,
  Query,
  Mutation,
  ID,
  ResolveField,
  Int,
  Parent,
} from '@nestjs/graphql';
import { EGTDivision } from './egtDivision.entity';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EGTDivisionGuard } from './egtDivision.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import {
  CreateEGTDivisionInput,
  EGTDivisionFilterInput,
} from './egtDivision.types';
import { EGTDivisionService } from './egtDivision.service';
import { CompetitionService } from 'src/base/competition/competition.service';
import { SEX } from 'src/base/starter/starter.types';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';

@Resolver(() => EGTDivision)
@UseGuards(EGTDivisionGuard, RoleGuard)
export class EGTDivisionResolver {
  @Inject()
  private egtDivisionService: EGTDivisionService;

  @Inject()
  private competitionService: CompetitionService;

  @Role(ROLES.VIEWER)
  @Query(() => [EGTDivision], { name: 'egtDivisions' })
  findAll(
    @Args('filter') filter: EGTDivisionFilterInput,
  ): Promise<EGTDivision[]> {
    return this.egtDivisionService.findAll(filter);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTDivision, { name: 'createEgtDivision' })
  async create(
    @Args('data') data: CreateEGTDivisionInput,
  ): Promise<EGTDivision> {
    const competition = await this.competitionService.findOne(
      data.competitionID,
    );
    if (!competition) {
      throw new NotFoundException();
    }

    const division = new EGTDivision();
    division.competition = Promise.resolve(competition);
    division.sex = data.sex;
    division.category = data.category;
    division.ground = data.ground;

    return this.egtDivisionService.create(division);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTDivision, { name: 'removeEgtDivision' })
  remove(@Args('id', { type: () => ID }) id: number): Promise<EGTDivision> {
    return this.egtDivisionService.remove(id);
  }

  @ResolveField(() => Int)
  totalRounds(@Parent() division: EGTDivision): number {
    return division.totalRounds;
  }

  @ResolveField(() => StarterLink)
  async starters(@Parent() division: EGTDivision): Promise<StarterLink[]> {
    const lineups = await division.lineups;
    let egtStarterLinks: EGTStarterLink[] = [];
    for (const lineup of lineups) {
      egtStarterLinks = egtStarterLinks.concat(await lineup.starterlinks);
    }

    return Promise.all(
      egtStarterLinks.map(
        async (egtStarterLink) => await egtStarterLink.starterLink,
      ),
    );
  }
}
