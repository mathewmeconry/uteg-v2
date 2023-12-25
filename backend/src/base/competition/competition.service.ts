import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompetitionService {
  @InjectRepository(Competition)
  private competitionRepository: Repository<Competition>;

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
