import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StarterLink } from './starterLink.entity';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { StarterLinkService } from './starterLink.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/auth/types';
import { Role } from 'src/auth/decorators/role.decorator';
import { StarterLinkGuard } from './starterLink.guard';
import {
  CreateStarterLinkInput,
  UpdateStarterLinkInput,
} from './starterLink.types';
import { StarterService } from '../starter/starter.service';
import { ClubService } from '../club/club.service';
import { CompetitionService } from '../competition/competition.service';
import { Starter } from '../starter/starter.entity';
import { Club } from '../club/club.entity';
import { Competition } from '../competition/competition.entity';
import { SEX } from '../starter/starter.types';
import { AlreadyExistingException } from '../exceptions/AlreadyExisting';

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
  async findById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<StarterLink | null> {
    return this.starterLinkService.findOne(id);
  }

  @Role(ROLES.VIEWER)
  @Query(() => [StarterLink], {
    name: 'starterLinks',
  })
  async find(
    @Args('competitionID', { type: () => ID }) competitionID: number,
    @Args('sex', { nullable: true }) sex: SEX,
  ): Promise<StarterLink[]> {
    return this.starterLinkService.find(competitionID, sex);
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

  @Role(ROLES.ADMIN)
  @Mutation(() => StarterLink, { name: 'upsertStarterLink' })
  async upsert(
    @Args('data') linkData: CreateStarterLinkInput,
  ): Promise<StarterLink> {
    try {
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
      const result = await this.starterLinkService.create(starterLink);
      return result
    } catch (e) {
      if (e.message === "Already Existing") {
        const starterlink = await this.starterLinkService.findForCompetition(
          linkData.starterID,
          linkData.competitionID,
        );
        if (!starterlink) {
          throw new NotFoundException();
        }
        return this.starterLinkService.update(starterlink.id, linkData);
      }
      throw e;
    }
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => StarterLink, { name: 'updateStarterLink' })
  async updateLink(
    @Args('id', { type: () => ID }) id: number,
    @Args('data') data: UpdateStarterLinkInput,
  ): Promise<StarterLink> {
    return this.starterLinkService.update(id, data);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => StarterLink, { name: 'removeStarterLink' })
  async unlink(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<StarterLink> {
    return this.starterLinkService.remove(id);
  }

  @ResolveField(() => Starter)
  async starter(@Parent() starterLink: StarterLink): Promise<Starter> {
    return starterLink.starter;
  }

  @ResolveField(() => Club)
  async club(@Parent() starterLink: StarterLink): Promise<Club> {
    return starterLink.club;
  }

  @ResolveField(() => Competition)
  async competition(@Parent() starterLink: StarterLink): Promise<Competition> {
    return starterLink.competition;
  }
}
