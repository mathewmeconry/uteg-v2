import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EGTLineupService } from './egtLineup.service';
import { EGTDivisionService } from '../division/egtDivision.service';
import { EGTDivision } from '../division/egtDivision.entity';

@Injectable()
export class EGTLineupGuard implements CanActivate {
  @Inject()
  private egtLineupService: EGTLineupService;

  @Inject()
  private egtDivisionService: EGTDivisionService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    if (args.ids) {
      const lineups = await this.egtLineupService.findMany(args.ids);
      const divisions = await Promise.all(
        lineups.map((lineup) => lineup.division),
      );
      const competitions = await Promise.all(
        divisions.map((d) => d.competition),
      );

      const competitionIds = competitions.map((c) => c.id);
      const allSameIds = competitionIds.every((id) => id === competitionIds[0]);

      if (!allSameIds) {
        return false;
      }

      ctx.getContext().competition = competitionIds[0];
      return true;
    }

    let division: EGTDivision;
    if (args.id) {
      const lineup = await this.egtLineupService.findOne(args.id);
      division = await lineup.division;
    }

    if (args.data?.divisionID) {
      division = await this.egtDivisionService.findOne(args.data.divisionID);
    }

    if (args.filter?.divisionID) {
      division = await this.egtDivisionService.findOne(args.filter.divisionID);
    }

    if (!division) {
      return false;
    }

    ctx.getContext().competition = (await division.competition).id;
    return true;
  }
}
