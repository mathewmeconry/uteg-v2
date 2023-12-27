import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Starter } from './starter.entity';
import { StarterService } from './starter.service';
import { CreateStarterInput } from './starter.types';

@Resolver(() => Starter)
export class StarterResolver {
  @Inject()
  private starterService: StarterService;

  @Query(() => [Starter], { name: 'starters' })
  async findAll(): Promise<Starter[]> {
    return this.starterService.findAll();
  }

  @Mutation(() => Starter, { name: 'createStarter' })
  async create(
    @Args('starter') starterData: CreateStarterInput,
  ): Promise<Starter> {
    const starter = new Starter();
    starter.stvID = starterData.stvID;
    starter.firstname = starterData.firstname;
    starter.lastname = starterData.lastname;
    starter.birthyear = starterData.birthyear;
    return this.starterService.create(starter);
  }
}
