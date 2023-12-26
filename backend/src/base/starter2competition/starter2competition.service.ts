import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starter2Competition } from './starter2competition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Starter2CompetitionService {
  @InjectRepository(Starter2Competition)
  private starter2CompetitionRepository: Repository<Starter2Competition>;

  create(starter2Competition: Starter2Competition): Promise<Starter2Competition> {
    return this.starter2CompetitionRepository.save(starter2Competition)
  }

  findAll(): Promise<Starter2Competition[]> {
    return this.starter2CompetitionRepository.find();
  }

  findOne(id: number): Promise<Starter2Competition | null> {
    return this.starter2CompetitionRepository.findOneBy({ id });
  }

  findForCompetition(
    starterID: number,
    competitionID: number,
  ): Promise<Starter2Competition | null> {
    return this.starter2CompetitionRepository.findOneBy({
      competition: {
        id: competitionID,
      },
      starter: {
        id: starterID,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.starter2CompetitionRepository.delete(id);
  }
}
