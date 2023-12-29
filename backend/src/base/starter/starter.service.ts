import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starter } from './starter.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { StarterFilter } from './starter.types';
import { Starter2Competition } from '../starter2competition/starter2competition.entity';

@Injectable()
export class StarterService {
  @InjectRepository(Starter)
  private starterRepository: Repository<Starter>;

  async create(starter: Starter): Promise<Starter> {
    return this.starterRepository.save(starter);
  }

  findAll(): Promise<Starter[]> {
    return this.starterRepository.find();
  }

  find(filter: StarterFilter): Promise<Starter[]> {
    const where: FindOptionsWhere<Starter> = {
      starter2competitions: {
        competition: {
          id: filter.competitionID,
        },
      },
    };

    if (filter.sex) {
      where.sex = filter.sex;
    }

    if (filter.category) {
      (where.starter2competitions as FindOptionsWhere<Starter2Competition>).category = filter.category;
    }

    return this.starterRepository.find({
      relations: ['starter2competitions'],
      where,
    });
  }

  findOne(id: number): Promise<Starter | null> {
    return this.starterRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.starterRepository.delete(id);
  }
}
