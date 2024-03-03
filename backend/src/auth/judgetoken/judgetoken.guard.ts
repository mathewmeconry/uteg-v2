import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JudgetokenService } from './judgetoken.service';

// Enriches gql context with role assigned to starterLink
export class JudgetokenGuard implements CanActivate {
  @Inject()
  private readonly judgetokenService: JudgetokenService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    if (args.id) {
      const judgetoken = await this.judgetokenService.findOne(args.id);
      ctx.getContext().competition = (await judgetoken.competition).id;
      return true;
    }

    if (args.competitionID) {
      ctx.getContext().competition = args.competitionID;
      return true;
    }

    return false;
  }
}
