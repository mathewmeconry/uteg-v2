import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Competition } from 'src/base/competition/competition.entity';
import { ROLES } from '../types';
import { UserLink } from './userLink.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(UserLink)
  private userLinkRepository: Repository<UserLink>;

  @Inject()
  private configService: ConfigService;

  async create(user: User): Promise<User> {
    user.password = await this.hash(user.password);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  link(
    user: User,
    competition: Competition,
    role: ROLES,
  ): Promise<UserLink> {
    const userLink = new UserLink();
    userLink.user = Promise.resolve(user);
    userLink.competition = Promise.resolve(competition);
    userLink.role = role;
    return this.userLinkRepository.save(userLink);
  }

  async isLinked(userID: number, competitionID: number): Promise<ROLES | null> {
    const entity = await this.userLinkRepository.findOne({
      where: {
        competition: {
          id: competitionID,
        },
        user: {
          id: userID,
        },
      },
    });
    if (!entity) {
      return null;
    }

    return entity.role;
  }

  findLinked(userID: number): Promise<UserLink[]> {
    return this.userLinkRepository.find({
      where: {
        user: {
          id: userID,
        },
      },
    });
  }

  async getGlobalRole(userID: number): Promise<ROLES> {
    const entity = await this.userRepository.findOneBy({id: userID})
    return entity.globalRole
  }

  hash(data: string): Promise<string> {
    return bcrypt.hash(
      data,
      this.configService.get<number>('BCRYPT_ROUNDS') || 10,
    );
  }

  compare(input: string, hash: string): Promise<boolean> {
    try {
      return bcrypt.compare(input, hash);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
