import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StarterService } from 'src/base/starter/starter.service';
import { ConfigService } from 'src/config/config.service';
import { Starter2CompetitionService } from 'src/base/starter2competition/starter2competition.service';
import * as bcrypt from 'bcrypt';
import { ROLES } from './types';

export type JwtPayload = {
  sub: number;
  metadata: {
    email: string;
    firstname: string;
    lastname: string;
  };
};

@Injectable()
export class AuthService {
  @Inject(forwardRef(() => StarterService))
  private starterService: StarterService;

  @Inject()
  private starter2competitionService: Starter2CompetitionService;

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private configService: ConfigService;

  public async authenticate(email: string, password: string): Promise<string> {
    const starter = await this.starterService.findOneByEmail(email);
    if (!starter) {
      throw new UnauthorizedException();
    }
    if (!this.compare(password, starter.password)) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: starter.id,
      metadata: {
        email: starter.email,
        firstname: starter.firstname,
        lastname: starter.lastname,
      },
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
    const starter2competition =
      await this.starter2competitionService.findForCompetition(
        starterID,
        competitionID,
      );
    if (!starter2competition) {
      return false;
    }

    return starter2competition.role >= role;
  }

  public validateJwt(jwt: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(jwt);
  }

  public hash(data: string): Promise<string> {
    return bcrypt.hash(
      data,
      this.configService.get<number>('BCRYPT_ROUNDS') || 10,
    );
  }

  public compare(input: string, hash: string): Promise<boolean> {
    try {
      return bcrypt.compare(input, hash);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
