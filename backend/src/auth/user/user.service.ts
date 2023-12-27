import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Competition } from 'src/base/competition/competition.entity';
import { ROLES } from '../types';
import { User2Competition } from './user2competition.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(User2Competition)
  private user2competitionRepository: Repository<User2Competition>;

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
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  link(
    user: User,
    competition: Competition,
    role: ROLES,
  ): Promise<User2Competition> {
    const user2competition = new User2Competition();
    user2competition.user = user;
    user2competition.competition = competition;
    user2competition.role = role;
    return this.user2competitionRepository.save(user2competition);
  }

  async isLinked(userID: number, competitionID: number): Promise<ROLES> {
    const entity = await this.user2competitionRepository.findOne({
      where: {
        competition: {
          id: competitionID,
        },
        user: {
          id: userID,
        },
      },
    });
    return entity.role;
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
