import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Starter2CompetitionService } from './starter2competition.service';

@Injectable()
export class Starter2CompetitionGuard implements CanActivate {
  @Inject()
  private starter2competitionService: Starter2CompetitionService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    if (!args.competitionID) {
      const starter2competition = await this.starter2competitionService.findOne(
        args.id,
      );

      ctx.getContext().competition = (await starter2competition.competition).id;
      return true;
    }
    ctx.getContext().competition = args.competitionID;
  }
}
