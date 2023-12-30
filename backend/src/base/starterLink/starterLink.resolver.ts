import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StarterLink } from './starterLink.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { StarterLinkService } from './starterLink.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/auth/types';
import { Role } from 'src/auth/decorators/role.decorator';
import { StarterLinkGuard } from './starterLink.guard';
import { CreateStarterLinkInput } from './starterLink.types';
import { StarterService } from '../starter/starter.service';
import { ClubService } from '../club/club.service';
import { CompetitionService } from '../competition/competition.service';

@Resolver(() => StarterLink)
@UseGuards(StarterLinkGuard, RoleGuard)
export class StarterLinkResolver {
  @Inject()
  private starterLinkService: StarterLinkService;

  @Inject()
  private starterService: StarterService;

  @Inject()
  private clubService: ClubService;

  @Inject()
  private competitionService: CompetitionService;

  @Role(ROLES.VIEWER)
  @Query(() => StarterLink, {
    name: 'starterLink',
    nullable: true,
  })
  async findById(@Args('id') id: number): Promise<StarterLink | null> {
    return this.starterLinkService.findOne(id);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => StarterLink, { name: 'createStarterLink' })
  async link(
    @Args('data') linkData: CreateStarterLinkInput,
  ): Promise<StarterLink> {
    const starterLink = new StarterLink();
    starterLink.starter = Promise.resolve(
      await this.starterService.findOne(linkData.starterID),
    );
    starterLink.club = Promise.resolve(
      await this.clubService.findOne(linkData.clubID),
    );
    starterLink.competition = Promise.resolve(
      await this.competitionService.findOne(linkData.competitionID),
    );
    return this.starterLinkService.create(starterLink);
  }
}
