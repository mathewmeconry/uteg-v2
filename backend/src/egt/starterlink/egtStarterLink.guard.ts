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

@Injectable()
export class EGTStarterLinkGuard implements CanActivate {
  @Inject()
  private starterLinkService: StarterLinkService;

  @Inject()
  private egtStarterLinkService: EGTStarterLinkService;

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

    const starterLink = await this.starterLinkService.findOne(starterLinkID);

    if (starterLink) {
      ctx.getContext().competition = (await starterLink.competition).id;
    }
    return true;
  }
}
