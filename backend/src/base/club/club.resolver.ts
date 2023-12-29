import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Club } from './club.entity';
import { ClubService } from './club.service';
import { Inject } from '@nestjs/common';
import { CreateClubInput } from './club.types';

@Resolver(() => Club)
export class ClubResolver {
  @Inject()
  private clubService: ClubService;

  @Query(() => [Club], { name: 'clubs' })
  async findAll(): Promise<Club[]> {
    return this.clubService.findAll();
  }

  @Mutation(() => Club, {name: 'createClub'})
  async create(@Args('data') clubData: CreateClubInput): Promise<Club> {
    const club = new Club();
    club.name = clubData.name;
    club.location = clubData.location;
    return this.clubService.create(club);
  }
}
