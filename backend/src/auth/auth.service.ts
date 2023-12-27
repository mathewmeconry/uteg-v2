import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { ROLES } from './types';
import { UserService } from './user/user.service';

export type JwtPayload = {
  sub: number;
  email: string;
};

@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private configService: ConfigService;

  public async authenticate(email: string, password: string): Promise<string> {
    const starter = await this.userService.findOneByEmail(email);
    if (!starter) {
      throw new UnauthorizedException();
    }
    if (!this.userService.compare(password, starter.password)) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: starter.id,
      email: starter.email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION') || '10s',
    });
  }

  public async authorize(
    starterID: number,
    competitionID: number,
    role: ROLES,
  ): Promise<boolean> {
    const assignedRole = await this.userService.isLinked(
      starterID,
      competitionID,
    );
    return assignedRole >= role;
  }

  public validateJwt(jwt: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(jwt);
  }
}
