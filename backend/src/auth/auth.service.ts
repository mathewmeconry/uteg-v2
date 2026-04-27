import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { ROLES } from './types';
import { UserService } from './user/user.service';
import { JudgetokenService } from './judgetoken/judgetoken.service';
import { DisplaytokenService } from './displaytoken/displaytoken.service';

export enum JwtType {
  USER,
  JUDGE,
  DISPLAY,
}

export type JwtPayload = JwtUserPayload | JwtJudgePayload | JwtDisplayPayload;

export type JwtUserPayload = {
  type: JwtType.USER;
  sub: number;
  email: string;
};

export type JwtDisplayPayload = {
  type: JwtType.DISPLAY;
  sub: number;
  competition: number;
  ground: number;
};

export type JwtJudgePayload = {
  type: JwtType.JUDGE;
  sub: number;
  competition: number;
  device: number;
  ground: number;
};

@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private configService: ConfigService;

  @Inject()
  private judgetokenService: JudgetokenService;

  @Inject()
  private displaytokenService: DisplaytokenService;

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

    const payload: JwtUserPayload = {
      type: JwtType.USER,
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION') || '10s',
    });
  }

  public async authenticateWithToken(token: string): Promise<string> {
    const judgeToken = await this.judgetokenService.findByToken(token);
    if (!judgeToken) {
      throw new UnauthorizedException();
    }

    const payload: JwtJudgePayload = {
      type: JwtType.JUDGE,
      competition: (await judgeToken.competition).id,
      sub: judgeToken.id,
      device: judgeToken.device,
      ground: judgeToken.ground,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION') || '10s',
    });
  }

  public async authenticateWithDisplayToken(token: string): Promise<string> {
    const displayToken = await this.displaytokenService.findByToken(token);
    if (!displayToken) {
      throw new UnauthorizedException();
    }

    const payload: JwtDisplayPayload = {
      type: JwtType.DISPLAY,
      sub: displayToken.id,
      competition: (await displayToken.competition).id,
      ground: displayToken.ground,
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

  public async authorizeJudge(
    judgeID: number,
    competitionID: number,
  ): Promise<boolean> {
    if (!competitionID) {
      return false;
    }

    const judge = await this.judgetokenService.findOne(judgeID);
    if (!judge) {
      return false;
    }
    return (await judge.competition).id === parseInt(competitionID.toString());
  }

  public async displayAuthorize(displayID: number, competitionID: number): Promise<boolean> {
    if (!competitionID) {
      return false;
    }

    const display = await this.displaytokenService.findOne(displayID);
    if (!display) {
      return false;
    }
    return (await display.competition).id === parseInt(competitionID.toString());
  }

  public async globalAuthorize(userID: number, role: ROLES): Promise<boolean> {
    const globalRole = await this.userService.getGlobalRole(userID);
    return globalRole >= role;
  }

  public validateJwt(jwt: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(jwt);
  }

  public signJwt(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION') || '10s',
    });
  }
}
