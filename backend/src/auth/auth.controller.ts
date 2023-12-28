import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post()
  @Public()
  async authenticate(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ token: string }> {
    return {
      token: await this.authService.authenticate(email, password),
    };
  }
}
