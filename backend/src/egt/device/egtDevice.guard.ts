import {
  Injectable,
  CanActivate,
  Inject,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EGTDeviceService } from './egtDevice.service';

@Injectable()
export class EGTDeviceGuard implements CanActivate {
  @Inject()
  private egtDeviceService: EGTDeviceService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ectx = GqlExecutionContext.create(context);
    const args = ectx.getArgs();
    const ctx = ectx.getContext();

    if (args.id) {
      ctx.competition = (
        await (
          await this.egtDeviceService.findOne(args.id)
        ).competition
      ).id;
      return true;
    }

    if (args.competitionID) {
      ctx.competition = args.competitionID;
      return true;
    }
  }
}
