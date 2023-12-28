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

    if (!role) {
      return true;
    }

    return this.authService.authorize(
      ctx.getContext().user.id,
      ctx.getContext().competition,
      role,
    );
  }
}
