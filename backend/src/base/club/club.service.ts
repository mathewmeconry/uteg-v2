import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {
  @InjectRepository(Club)
  private clubRepository: Repository<Club>;

  findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  findOne(id: number): Promise<Club | null> {
    return this.clubRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.clubRepository.delete(id);
  }
}
