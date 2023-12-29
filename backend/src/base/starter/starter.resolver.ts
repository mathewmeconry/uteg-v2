import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Starter } from './starter.entity';
import { StarterService } from './starter.service';
import { CreateStarterInput, StarterFilter } from './starter.types';
import { StarterGuard } from './starter.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';

@Resolver(() => Starter)
@UseGuards(StarterGuard, RoleGuard)
export class StarterResolver {
  @Inject()
  private starterService: StarterService;

  @Mutation(() => Starter, { name: 'createStarter' })
  async create(
    @Args('starter') starterData: CreateStarterInput,
  ): Promise<Starter> {
    const starter = new Starter();
    starter.stvID = starterData.stvID;
    starter.firstname = starterData.firstname;
    starter.lastname = starterData.lastname;
    starter.birthyear = starterData.birthyear;
    starter.sex = starterData.sex;
    return this.starterService.create(starter);
  }

  @Query(() => [Starter], {name: 'starters'})
  @Role(ROLES.VIEWER)
  async find(@Args('filter') filter: StarterFilter): Promise<Starter[]> {
      return this.starterService.find(filter)
  }
}
