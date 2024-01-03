import {
  Args,
  Mutation,
  Parent,
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
import { CreateEGTStarterLinkInput } from './egtStarterLink.types';

@Resolver(() => EGTStarterLink)
@UseGuards(EGTStarterLinkGuard, RoleGuard)
export class EGTStarterLinkResolver {
  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

  @Inject()
  private egtDivisionService: EGTDivisionService;
  @Inject()
  private starterLinkService: StarterLinkService;

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTStarterLink, { name: 'createEGTStarterLink' })
  async create(
    @Args('data') linkData: CreateEGTStarterLinkInput,
  ): Promise<EGTStarterLink> {
    const link = new EGTStarterLink();
    link.division = Promise.resolve(
      await this.egtDivisionService.findOne(linkData.divisionID),
    );

    link.starterLink = Promise.resolve(
      await this.starterLinkService.findOne(linkData.starterLinkID),
    );

    return this.egtStarterLinkService.create(link);
  }

  @ResolveField(() => EGTDivision)
  async division(
    @Parent() egtStarterLink: EGTStarterLink,
  ): Promise<EGTDivision> {
    return egtStarterLink.division;
  }
}
