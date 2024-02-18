import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { In, Repository } from 'typeorm';
import { UserService } from 'src/auth/user/user.service';
import { User } from 'src/auth/user/user.entity';
import { ROLES } from 'src/auth/types';
import { ModuleService } from '../modules/module.service';

@Injectable()
export class CompetitionService {
  @InjectRepository(Competition)
  private competitionRepository: Repository<Competition>;

  @Inject()
  private userService: UserService;

  @Inject()
  private moduleService: ModuleService;

  async create(competition: Competition, user: User): Promise<Competition> {
    competition = await this.competitionRepository.save(competition);
    await this.userService.link(user, competition, ROLES.ADMIN);
    await this.moduleService.initCompetition(competition);
    return competition;
  }

  async save(competition: Competition): Promise<Competition> {
    return this.competitionRepository.save(competition);
  }

  findAll(): Promise<Competition[]> {
    return this.competitionRepository.find();
  }

  findOne(id: number): Promise<Competition | null> {
    return this.competitionRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.competitionRepository.delete(id);
  }
}
