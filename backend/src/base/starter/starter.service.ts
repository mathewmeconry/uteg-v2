import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starter } from './starter.entity';
import { Repository } from 'typeorm';

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

  findOne(id: number): Promise<Starter | null> {
    return this.starterRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.starterRepository.delete(id);
  }
}
