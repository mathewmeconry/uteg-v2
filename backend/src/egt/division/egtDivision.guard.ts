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

    if (args.data.competitionID) {
      ctx.getContext().competition = args.data.competitionID;
      return true;
    }

    if (args.filter.competitionID) {
      ctx.getContext().competition = args.data.competitionID;
      return true;
    }


    return false;
  }
}
