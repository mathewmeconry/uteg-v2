import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EGTDivisionService } from './egtDivision.service';

@Injectable()
export class EGTDivisionGuard implements CanActivate {
  @Inject()
  private egtDivisionService: EGTDivisionService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    if (args.id) {
      ctx.getContext().competition = (
        await (
          await this.egtDivisionService.findOne(args.id)
        ).competition
      ).id;
      return true;
    }

    if (args.data && args.data.id) {
      ctx.getContext().competition = (
        await (
          await this.egtDivisionService.findOne(args.data.id)
        ).competition
      ).id;
      return true;
    }

    if (args.data && args.data.competitionID) {
      ctx.getContext().competition = args.data.competitionID;
      return true;
    }

    if (args.filter && args.filter.competitionID) {
      ctx.getContext().competition = args.filter.competitionID;
      return true;
    }

    return false;
  }
}
