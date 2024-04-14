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
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { EGTStarterLinkInput } from './egtStarterLink.types';
import { EGTLineup } from '../lineup/egtLineup.entity';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';

@Resolver(() => EGTStarterLink)
@UseGuards(EGTStarterLinkGuard, RoleGuard)
export class EGTStarterLinkResolver {
  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

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
    return this.egtStarterLinkService.create(linkData, ignoreDivision);
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

  @ResolveField()
  isDeleted(@Parent() egtStarterLink: EGTStarterLink): boolean {
    return !!egtStarterLink.deletedAt;
  }
}
