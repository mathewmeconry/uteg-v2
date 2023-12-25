import { Inject } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { Starter } from './starter.entity';
import { StarterService } from './starter.service';

@Resolver(() => Starter)
export class StarterResolver {
  @Inject()
  private starterService: StarterService;

  @Query(() => [Starter], { name: 'starters' })
  async findAll(): Promise<Starter[]> {
    return this.starterService.findAll();
  }
}
