import { Query, Resolver } from '@nestjs/graphql';
import { Club } from './club.entity';
import { ClubService } from './club.service';
import { Inject } from '@nestjs/common';

@Resolver(() => Club)
export class ClubResolver {
  @Inject()
  private clubService: ClubService;

  @Query(() => [Club], { name: 'clubs' })
  async findAll(): Promise<Club[]> {
    return this.clubService.findAll();
  }
}
