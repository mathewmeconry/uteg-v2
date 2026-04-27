import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DisplaytokenService } from './displaytoken.service';

// Enriches gql context with role assigned to starterLink

export class DisplaytokenGuard implements CanActivate {
  @Inject()
  private readonly displaytokenService: DisplaytokenService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    if (args.id) {
      const displaytoken = await this.displaytokenService.findOne(args.id);
      ctx.getContext().competition = (await displaytoken.competition).id;
      return true;
    }

    if (args.competitionID) {
      ctx.getContext().competition = args.competitionID;
      return true;
    }

    return false;
  }
}
