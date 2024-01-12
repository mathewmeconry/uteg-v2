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
import { Inject, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EGTStarterLinkGuard } from './egtStarterLink.guard';
import { EGTStarterLinkService } from './egtStarterLink.service';
import { EGTDivision } from '../division/egtDivision.entity';
import { EGTDivisionService } from '../division/egtDivision.service';
import { StarterLinkService } from 'src/base/starterLink/starterLink.service';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { EGTStarterLinkInput } from './egtStarterLink.types';

@Resolver(() => EGTStarterLink)
@UseGuards(EGTStarterLinkGuard, RoleGuard)
export class EGTStarterLinkResolver {
  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

  @Inject()
  private egtDivisionService: EGTDivisionService;
  @Inject()
  private starterLinkService: StarterLinkService;

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
    let link = await this.egtStarterLinkService.findByStarterLink(
      linkData.starterLinkID,
    );

    if (!link) {
      link = new EGTStarterLink();
    }

    if (linkData.divisionID) {
      link.division = Promise.resolve(
        await this.egtDivisionService.findOne(linkData.divisionID),
      );
    }

    if (linkData.category) {
      link.category = linkData.category;
    }

    if (!(await link.starterLink)) {
      link.starterLink = Promise.resolve(
        await this.starterLinkService.findOne(linkData.starterLinkID),
      );
    }

    return this.egtStarterLinkService.save(link);
  }

  @ResolveField(() => EGTDivision)
  async division(
    @Parent() egtStarterLink: EGTStarterLink,
  ): Promise<EGTDivision> {
    return egtStarterLink.division;
  }
}
