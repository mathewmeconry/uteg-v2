import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService, JwtType } from '../auth.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private authService: AuthService;

  @Inject()
  private userService: UserService;

  @Inject()
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // If route is public: bypass authentication check
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // check if user is authenticated
    const ctx = GqlExecutionContext.create(context);
    const token = this.extractTokenFromHeader(ctx.getContext().req);
    try {
      const payload = await this.authService.validateJwt(token);
      switch(payload.type) {
        case JwtType.USER:
          ctx.getContext().user = await this.userService.findOne(payload.sub);
          break;
        case JwtType.JUDGE:
          ctx.getContext().judge = payload;
          break;
      }

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
