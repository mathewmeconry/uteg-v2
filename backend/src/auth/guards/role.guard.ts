import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLE_KEY } from '../decorators/role.decorator';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../types';
import { GLOBAL_ROLE_KEY } from '../decorators/globalRole.decorator';
import { JUDGE_KEY } from '../decorators/judge.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  @Inject()
  private authService: AuthService;

  @Inject()
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const role = this.reflector.getAllAndOverride<ROLES>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const globalRole = this.reflector.getAllAndOverride<ROLES>(
      GLOBAL_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const judgeAllowed = this.reflector.getAllAndOverride<boolean>(JUDGE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role && !globalRole) {
      return true;
    }

    if (ctx.getContext().judge) {
      if (role <= ROLES.JUDGE || judgeAllowed) {
        return this.authService.authorizeJudge(
          ctx.getContext().judge.sub,
          ctx.getContext().competition,
        );
      }
    }

    if (!ctx.getContext().user) {
      return false;
    }

    if (globalRole) {
      if (
        await this.authService.globalAuthorize(
          ctx.getContext().user.id,
          globalRole,
        )
      ) {
        return true;
      }
    }

    return this.authService.authorize(
      ctx.getContext().user.id,
      ctx.getContext().competition,
      role,
    );
  }
}
