import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { EGTStarterLinkService } from '../starterlink/egtStarterLink.service';
import { StarterLinkGuard } from './starterLink.guard.extension';

@Resolver(() => StarterLink)
@UseGuards(StarterLinkGuard)
export class EGTStarterLinkExtensionResolver {
  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

  @ResolveField(() => EGTStarterLink, { nullable: true })
  async egt(@Root() starterLink: StarterLink): Promise<EGTStarterLink> {
    return this.egtStarterLinkService.findByStarterLink(starterLink.id);
  }
}
