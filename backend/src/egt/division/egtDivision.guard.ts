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
    const ectx = GqlExecutionContext.create(context);
    const args = ectx.getArgs();
    const ctx = ectx.getContext();

    if (args.id) {
      ctx.competition = (
        await (
          await this.egtDivisionService.findOne(args.id)
        ).competition
      ).id;
      return true;
    }

    if (args.ids) {
      for (const id of args.ids) {
        const competitionID = (
          await (
            await this.egtDivisionService.findOne(id)
          ).competition
        ).id;
        // this only allows divisions to be part of the same competition to be passed in
        if (ctx.competition !== competitionID && ctx.competition) {
          return false;
        }
        ctx.competition = competitionID;
        return true;
      }
    }

    if (args.data && args.data.id) {
      ctx.competition = (
        await (
          await this.egtDivisionService.findOne(args.data.id)
        ).competition
      ).id;
      return true;
    }

    if (args.data && args.data.competitionID) {
      ctx.competition = args.data.competitionID;
      return true;
    }

    if (args.filter && args.filter.competitionID) {
      ctx.competition = args.filter.competitionID;
      return true;
    }

    return false;
  }
}
