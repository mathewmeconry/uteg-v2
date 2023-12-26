import {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Enriches gql context with role assigned to starter2competition
export class Starter2CompetitionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    ctx.getContext().competition = args.id;
    return true;
  }
}
