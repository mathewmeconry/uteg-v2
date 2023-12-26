import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { Starter } from '../starter/starter.entity';
import { Starter2Competition } from '../starter2competition/starter2competition.entity';
import { ROLES } from 'src/auth/types';
import { Starter2CompetitionService } from '../starter2competition/starter2competition.service';

@Injectable()
export class CompetitionService {
  @InjectRepository(Competition)
  private competitionRepository: Repository<Competition>;

  @Inject()
  private starter2competitionService: Starter2CompetitionService;

  async create(
    competition: Competition,
    creator: Starter,
  ): Promise<Competition> {
    competition = await this.competitionRepository.save(competition);

    const starter2competition = new Starter2Competition();
    starter2competition.starter = creator;
    starter2competition.competition = competition;
    starter2competition.role = ROLES.ADMIN;
    await this.starter2competitionService.create(starter2competition);

    return competition;
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
