import {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Enriches gql context with role assigned to starterLink
export class CompetitionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    ctx.getContext().competition = args.id;
    return true;
  }
}
