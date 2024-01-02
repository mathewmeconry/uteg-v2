import { Inject, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { Starter } from './starter.entity';
import { StarterService } from './starter.service';
import {
  CreateStarterInput,
  StarterFilter,
  UpdateStarterInput,
} from './starter.types';
import { StarterGuard } from './starter.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { StarterLink } from '../starterLink/starterLink.entity';
import { StarterLinkService } from '../starterLink/starterLink.service';
import { GlobalRole } from 'src/auth/decorators/globalRole.decorator';

@Resolver(() => Starter)
@UseGuards(StarterGuard, RoleGuard)
export class StarterResolver {
  @Inject()
  private starterService: StarterService;

  @Inject()
  private starterLinkService: StarterLinkService;

  @Mutation(() => Starter, { name: 'createStarter' })
  async create(
    @Args('data') starterData: CreateStarterInput,
  ): Promise<Starter> {
    const starter = new Starter();
    starter.stvID = starterData.stvID;
    starter.firstname = starterData.firstname;
    starter.lastname = starterData.lastname;
    starter.birthyear = starterData.birthyear;
    starter.sex = starterData.sex;
    return this.starterService.create(starter);
  }

  @GlobalRole(ROLES.ADMIN)
  @Mutation(() => Starter, { name: 'updateStarter' })
  async update(
    @Args('id', { type: () => ID }) starterID: number,
    @Args('data') starterData: UpdateStarterInput,
  ): Promise<Starter> {
    return this.starterService.update(starterID, starterData);
  }

  @Query(() => [Starter], { name: 'starters' })
  @Role(ROLES.VIEWER)
  async find(@Args('filter') filter: StarterFilter): Promise<Starter[]> {
    return this.starterService.find(filter);
  }

  @ResolveField(() => [StarterLink])
  async starterLinks(@Parent() starter: Starter): Promise<StarterLink[]> {
    return this.starterLinkService.findForStarter(starter.id);
  }
}
