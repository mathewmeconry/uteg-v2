import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post()
  @Public()
  authenticate(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<string> {
    return this.authService.authenticate(email, password);
  }
}
