import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EGTSettingsService } from './egtSettings.service';

@Injectable()
export class EGTSettingsGuard implements CanActivate {
  @Inject()
  private readonly egtSettingsService: EGTSettingsService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ectx = GqlExecutionContext.create(context);
    const args = ectx.getArgs();
    const ctx = ectx.getContext();

    if (args.competitionID) {
      ctx.competition = args.competitionID;
      return true;
    }

    if (args.id) {
      const settings = await this.egtSettingsService.findOne(args.id);
      if (!settings) {
        return false;
      }
      ctx.competition = (await settings.competition).id;
      return true;
    }

    return false;
  }
}
