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
    if (!email || !password) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await this.userService.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION') || '10s',
    });
  }

  public async authorize(
    userID: number,
    competitionID: number,
    role: ROLES,
  ): Promise<boolean> {
    const assignedRole = await this.userService.isLinked(userID, competitionID);
    return assignedRole >= role;
  }

  public async globalAuthorize(userID: number, role: ROLES): Promise<boolean> {
    const globalRole = await this.userService.getGlobalRole(userID);
    return globalRole >= role;
  }

  public validateJwt(jwt: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(jwt);
  }
}
