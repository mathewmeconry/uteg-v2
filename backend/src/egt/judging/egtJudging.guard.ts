import {
  Injectable,
  CanActivate,
  Inject,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EGTDivisionService } from '../division/egtDivision.service';

@Injectable()
export class EGTJudgingGuard implements CanActivate {
  @Inject()
  private egtDivisionService: EGTDivisionService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ectx = GqlExecutionContext.create(context);
    const args = ectx.getArgs();
    const ctx = ectx.getContext();

    const divisions = await this.egtDivisionService.findMany(args.ids);
    const competitions = await Promise.all(
      divisions.map(async (d) => await d.competition),
    );
    // check if all competitions have the same ids
    const competitionIds = competitions.map((c) => c.id);
    const allSameIds = competitionIds.every((id) => id === competitionIds[0]);

    if (!allSameIds) {
      return false;
    }

    ctx.competition = competitionIds[0];
    return true;
  }
}
