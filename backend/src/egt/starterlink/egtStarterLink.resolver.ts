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
import { StarterService } from 'src/base/starter/starter.service';
import { EGTLineup } from '../lineup/egtLineup.entity';

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
  private starterService: StarterService;

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

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTStarterLink, { name: 'egtStarterLink' })
  async create(
    @Args('data') linkData: EGTStarterLinkInput,
  ): Promise<EGTStarterLink> {
    if (linkData.divisionID && linkData.divisionNumber) {
      throw new BadRequestException();
    }

    let link = await this.egtStarterLinkService.findByStarterLink(
      linkData.starterLinkID,
    );

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

      if (!division) {
        throw new Error('Division not found');
      }
      link.division = Promise.resolve(division);
    }

    if (linkData.divisionID) {
      link.division = Promise.resolve(
        await this.egtDivisionService.findOne(linkData.divisionID),
      );
    }

    if (linkData.category) {
      link.category = linkData.category;
    }

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
}
