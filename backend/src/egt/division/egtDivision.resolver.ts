import {
  Args,
  Resolver,
  Query,
  Mutation,
  ID,
  ResolveField,
  Int,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import {
  EGTDivision,
  EGTDivisionPubSub,
  EGTDivisionPubSubEvents,
} from './egtDivision.entity';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EGTDivisionGuard } from './egtDivision.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import {
  CreateEGTDivisionInput,
  EGTDivisionFilterInput,
  UpdateEGTDivisionStateInput,
} from './egtDivision.types';
import { EGTDivisionService } from './egtDivision.service';
import { CompetitionService } from 'src/base/competition/competition.service';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { EGTLineup } from '../lineup/egtLineup.entity';

@Resolver(() => EGTDivision)
@UseGuards(EGTDivisionGuard, RoleGuard)
export class EGTDivisionResolver {
  @Inject()
  private egtDivisionService: EGTDivisionService;

  @Inject()
  private competitionService: CompetitionService;

  @Inject()
  private egtDivisionGuard: EGTDivisionGuard;

  @Role(ROLES.JUDGE)
  @Query(() => [EGTDivision], { name: 'egtDivisions' })
  findAll(
    @Args('filter') filter: EGTDivisionFilterInput,
  ): Promise<EGTDivision[]> {
    return this.egtDivisionService.findAll(filter);
  }

  @Role(ROLES.JUDGE)
  @Query(() => EGTDivision, { name: 'egtDivision', nullable: true })
  findOne(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<EGTDivision | null> {
    return this.egtDivisionService.findOne(id);
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

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTDivision, { name: 'updateEgtDivisionState' })
  updateState(
    @Args('data', { type: () => UpdateEGTDivisionStateInput })
    data: UpdateEGTDivisionStateInput,
  ): Promise<EGTDivision> {
    return this.egtDivisionService.updateState(data);
  }

  @Role(ROLES.JUDGE)
  @Subscription(() => EGTDivision, {
    name: 'egtDivision',
    async filter(
      this: EGTDivisionResolver,
      payload: EGTDivision,
      variables: { filter: EGTDivisionFilterInput },
      context,
    ) {
      const filtered = await this.egtDivisionService.filter(variables.filter, [
        payload,
      ]);

      if (filtered.length === 0) {
        return false;
      }

      return await this.egtDivisionGuard.canAccess(filtered, context);
    },
    resolve: (payload) => payload,
  })
  subscription(
    @Args('filter') filter: EGTDivisionFilterInput,
  ): AsyncIterator<EGTDivision, any, undefined> {
    return EGTDivisionPubSub.asyncIterator([
      EGTDivisionPubSubEvents.CREATE,
      EGTDivisionPubSubEvents.UPDATE,
    ]);
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

  @ResolveField(() => Int)
  async totalStarters(@Parent() division: EGTDivision): Promise<number> {
    return (await division.starterLinks).length;
  }

  @ResolveField(() => [EGTLineup])
  async lineups(@Parent() division: EGTDivision): Promise<EGTLineup[]> {
    return division.lineups;
  }
}
