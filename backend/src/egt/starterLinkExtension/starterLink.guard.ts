import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { StarterLinkService } from 'src/base/starterLink/starterLink.service';

@Injectable()
export class StarterLinkGuard implements CanActivate {
  @Inject()
  private starterLinkService: StarterLinkService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    const starterLink = await this.starterLinkService.findOne(
      args.starterLinkID,
    );

    ctx.getContext().competition = (await starterLink.competition).id;
    return true;
  }
}
