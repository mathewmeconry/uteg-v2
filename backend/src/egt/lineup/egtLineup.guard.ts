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

    let division: EGTDivision;

    if (args.id) {
      const lineup = await this.egtLineupService.findOne(args.id);
      division = await lineup.division;
    }

    if (args.data.divisionID) {
      division = await this.egtDivisionService.findOne(args.data.divisionID);
    }

    if (args.filter.divisionID) {
      division = await this.egtDivisionService.findOne(args.filter.divisionID);
    }

    if (!division) {
      return false;
    }

    ctx.getContext().competition = (await division.competition).id;
    return true;
  }
}
