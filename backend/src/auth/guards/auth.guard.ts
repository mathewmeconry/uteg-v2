import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { StarterService } from 'src/base/starter/starter.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private authService: AuthService;

  @Inject(forwardRef(() => StarterService))
  private starterService: StarterService;

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
      ctx.getContext().user = await this.starterService.findOne(payload.sub);

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
