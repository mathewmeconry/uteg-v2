import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Enriches gql context with role assigned to starter2competition
export class StarterGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    if (args.filter) {
      ctx.getContext().competition = args.filter.competitionID;
    }

    if (args.competitionID) {
      ctx.getContext().competition = args.competitionID;
    }
    return true;
  }
}
