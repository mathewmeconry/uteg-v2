import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { StarterLinkService } from 'src/base/starterLink/starterLink.service';
import { EGTStarterLinkService } from './egtStarterLink.service';
import { EGTStarterLink } from './egtStarterLink.entity';
import { AuthContext } from 'src/auth/types';
import { CompetitionService } from 'src/base/competition/competition.service';

@Injectable()
export class EGTStarterLinkGuard implements CanActivate {
  @Inject()
  private starterLinkService: StarterLinkService;

  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

  @Inject()
  private competitionService: CompetitionService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    if (ctx.getArgByIndex(0) instanceof EGTStarterLink) {
      const starterLink = await ctx.getArgByIndex(0).starterLink;
      ctx.getContext().competition = (await starterLink.competition).id;
      return true;
    }

    let starterLinkID: number = -1;

    if (args.data && args.data.starterLinkID) {
      starterLinkID = args.data.starterLinkID;
    }

    if (args.starterLinkID) {
      starterLinkID = args.starterLinkID;
    }

    if (args.id) {
      const starterLinkExtension = await this.egtStarterLinkService.findOne(
        args.id,
      );
      if (starterLinkExtension) {
        starterLinkID = (await starterLinkExtension.starterLink).id;
      }
    }

    if (args.ids) {
      const starterLinks = await this.egtStarterLinkService.findByIds(
        args.ids,
        true,
      );
      const competitions = await Promise.all(
        starterLinks.map(async (link) => {
          const starterLink = await this.starterLinkService.findOne(
            link.starterLinkId,
            true,
          );
          return this.competitionService.findOne(starterLink.competitionId);
        }),
      );
      const competitionIds = competitions
        .filter((competition) => !!competition)
        .map((c) => c.id);
      const allSameIds = competitionIds.every((id) => id === competitionIds[0]);
      if (!allSameIds) {
        return false;
      }
      ctx.getContext().competition = competitionIds[0];
      return true;
    }

    const starterLink = await this.starterLinkService.findOne(starterLinkID);

    if (starterLink) {
      ctx.getContext().competition = (await starterLink.competition).id;
    }
    return true;
  }

  async canAccess(egtStarterLink: EGTStarterLink, context: AuthContext) {
    const starterLink = await egtStarterLink.starterLink;
    const competition = await starterLink.competition;
    if (context.competition !== competition.id) {
      return false;
    }
    return true;
  }
}
