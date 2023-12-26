import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Starter } from './starter.entity';
import { StarterService } from './starter.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateStarterInput } from './starter.types';

@Resolver(() => Starter)
export class StarterResolver {
  @Inject()
  private starterService: StarterService;

  @Query(() => [Starter], { name: 'starters' })
  async findAll(): Promise<Starter[]> {
    return this.starterService.findAll();
  }

  @Public()
  @Mutation(() => Starter, { name: 'createStarter' })
  async create(
    @Args('starter') starterData: CreateStarterInput,
  ): Promise<Starter> {
    const starter = new Starter();
    starter.stvID = starterData.stvID;
    starter.firstname = starterData.firstname;
    starter.lastname = starterData.lastname;
    starter.birthyear = starterData.birthyear;
    starter.email = starterData.email;
    starter.password = starterData.password;
    return this.starterService.create(starter);
  }
}
