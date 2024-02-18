import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EGTStarterLink } from './egtStarterLink.entity';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EGTStarterLinkGuard } from './egtStarterLink.guard';
import { EGTStarterLinkService } from './egtStarterLink.service';
import { EGTDivision } from '../division/egtDivision.entity';
import { EGTDivisionService } from '../division/egtDivision.service';
import { StarterLinkService } from 'src/base/starterLink/starterLink.service';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { EGTStarterLinkInput } from './egtStarterLink.types';
import { EGTLineup } from '../lineup/egtLineup.entity';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';
import { EGTLineupService } from '../lineup/egtLineup.service';

@Resolver(() => EGTStarterLink)
@UseGuards(EGTStarterLinkGuard, RoleGuard)
export class EGTStarterLinkResolver {
  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

  @Inject()
  private egtDivisionService: EGTDivisionService;

  @Inject()
  private starterLinkService: StarterLinkService;

  @Inject()
  private egtLineupService: EGTLineupService;

  @Role(ROLES.VIEWER)
  @Query(() => EGTStarterLink, { nullable: true, name: 'egtStarterLink' })
  async egtStarterLink(
    @Args('id', { type: () => ID, nullable: true }) id: number,
    @Args('starterLinkID', { type: () => ID, nullable: true })
    starterLinkID: number,
  ): Promise<EGTStarterLink | null> {
    if (id) {
      return this.egtStarterLinkService.findOne(id);
    }
    return this.egtStarterLinkService.findByStarterLink(starterLinkID);
  }

  @Role(ROLES.VIEWER)
  @Query(() => [EGTStarterLink], { name: 'egtStarterLinkUnassigned' })
  async egtStarterLinkUnassigned(
    @Args('divisionID', { type: () => ID }) divisionID: number,
  ): Promise<EGTStarterLink[]> {
    return this.egtStarterLinkService.findUnassignedForDivision(divisionID);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTStarterLink, { name: 'egtStarterLink' })
  async create(
    @Args('data') linkData: EGTStarterLinkInput,
    @Args('ignoreDivision', { nullable: true, defaultValue: false })
    ignoreDivision: boolean = false, // ignores if the division doesn't exist
  ): Promise<EGTStarterLink> {
    if (linkData.divisionID && linkData.divisionNumber) {
      throw new BadRequestException();
    }

    if (!linkData.id && !linkData.starterLinkID) {
      throw new BadRequestException();
    }

    if (linkData.id && linkData.starterLinkID) {
      throw new BadRequestException();
    }

    let link: EGTStarterLink | null = null;
    if (linkData.starterLinkID) {
      link = await this.egtStarterLinkService.findByStarterLink(
        linkData.starterLinkID,
      );
    }

    if (linkData.id) {
      link = await this.egtStarterLinkService.findOne(linkData.id);
    }

    if (!link) {
      link = new EGTStarterLink();
    }

    if (!(await link.starterLink)) {
      link.starterLink = Promise.resolve(
        await this.starterLinkService.findOne(linkData.starterLinkID),
      );
    }

    if (linkData.divisionNumber) {
      if (!linkData.category) {
        throw new BadRequestException();
      }

      const starterLink = await link.starterLink;
      const starter = await starterLink.starter;
      const division = await this.egtDivisionService.findByNumber(
        (
          await starterLink.competition
        ).id,
        starter.sex,
        linkData.category,
        linkData.divisionNumber,
      );

      if (!division && !ignoreDivision) {
        throw new Error('Division not found');
      }
      if (division) {
        link.division = Promise.resolve(division);
      }
    }

    if (linkData.divisionID) {
      link.division = Promise.resolve(
        await this.egtDivisionService.findOne(linkData.divisionID),
      );
    }

    if (linkData.category) {
      link.category = linkData.category;
    }

    link.lineup = Promise.resolve(
      await this.egtLineupService.findOne(linkData.lineupID),
    );

    return this.egtStarterLinkService.save(link);
  }

  @ResolveField(() => EGTDivision, { nullable: true })
  async division(
    @Parent() egtStarterLink: EGTStarterLink,
  ): Promise<EGTDivision> {
    return egtStarterLink.division;
  }

  @ResolveField(() => EGTLineup, { nullable: true })
  async lineup(@Parent() egtStarterLink: EGTStarterLink): Promise<EGTLineup> {
    return egtStarterLink.lineup;
  }

  @ResolveField(() => StarterLink)
  async starterlink(
    @Parent() egtStarterLink: EGTStarterLink,
  ): Promise<StarterLink> {
    return egtStarterLink.starterLink;
  }
}
