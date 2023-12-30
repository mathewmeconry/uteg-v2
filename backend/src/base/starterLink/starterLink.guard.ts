import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { StarterLinkService } from './starterLink.service';

@Injectable()
export class StarterLinkGuard implements CanActivate {
  @Inject()
  private starterLinkService: StarterLinkService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    if (args.competitionID) {
      ctx.getContext().competition = args.competitionID;
      return true;
    }
    if (args.data && args.data.competitionID) {
      ctx.getContext().competition = args.data.competitionID;
      return true;
    }

    const starterLink = await this.starterLinkService.findOne(
      args.id,
    );

    ctx.getContext().competition = (await starterLink.competition).id;
    return true;
  }
}
