import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import {
  EGTStarterLink,
  EGTStarterLinkPubSub,
  EGTStarterLinkPubSubEvents,
} from './egtStarterLink.entity';
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
import { Judge } from 'src/auth/decorators/judge.decorator';
import { StarterLinkService } from 'src/base/starterLink/starterLink.service';

@Resolver(() => EGTStarterLink)
@UseGuards(EGTStarterLinkGuard, RoleGuard)
export class EGTStarterLinkResolver {
  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

  @Inject()
  private egtStarterLinkGuard: EGTStarterLinkGuard;

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

  @Role(ROLES.VIEWER)
  @Judge()
  @Query(() => [EGTStarterLink], { name: 'egtStarterLinks' })
  async egtStarterLinks(
    @Args('ids', { type: () => [ID], nullable: true }) ids: number[],
    @Args('divisionIDs', { type: () => [ID], nullable: true })
    divisionIDs: number[],
    @Args('withDeleted', { nullable: true, defaultValue: false })
    withDeleted: boolean = false,
  ): Promise<EGTStarterLink[]> {
    if (divisionIDs) {
      return this.egtStarterLinkService.findByDivisionIDs(
        divisionIDs,
        withDeleted,
      );
    }

    return this.egtStarterLinkService.findByIds(ids, withDeleted);
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

  @Role(ROLES.JUDGE)
  @Subscription(() => EGTStarterLink, {
    name: 'egtStarterLinks',
    async filter(
      this: EGTStarterLinkResolver,
      payload: EGTStarterLink,
      variables: { ids?: string[]; divisionIDs?: string[] },
      context,
    ) {
      if (
        variables.divisionIDs &&
        variables.divisionIDs.includes(payload.divisionID.toString())
      ) {
        return await this.egtStarterLinkGuard.canAccess(payload, context);
      }

      if (variables.ids && variables.ids.includes(payload.id.toString())) {
        return await this.egtStarterLinkGuard.canAccess(payload, context);
      }
      return false;
    },
    resolve: (payload) => payload,
  })
  subscription(
    @Args('ids', { type: () => [ID], nullable: true }) _ids: number[],
    @Args('divisionIDs', { type: () => [ID], nullable: true })
    _divisionIDs: number[],
  ) {
    return EGTStarterLinkPubSub.asyncIterator([
      EGTStarterLinkPubSubEvents.CREATE,
      EGTStarterLinkPubSubEvents.UPDATE,
      EGTStarterLinkPubSubEvents.DELETE,
    ]);
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
    return this.starterLinkService.findOne(egtStarterLink.starterLinkId, true);
  }

  @ResolveField()
  isDeleted(@Parent() egtStarterLink: EGTStarterLink): boolean {
    return !!egtStarterLink.deletedAt;
  }
}
