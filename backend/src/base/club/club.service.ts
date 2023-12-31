import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { Repository } from 'typeorm';
import { AlreadyExistingException } from '../exceptions/AlreadyExisting';

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

  async create(club: Club): Promise<Club> {
    const alreadyExisting = await this.clubRepository
      .createQueryBuilder('club')
      .where('LOWER(name) = LOWER(:name)', { name: club.name })
      .andWhere('LOWER(location) = LOWER(:location)', {
        location: club.location,
      })
      .getOne();

    if (alreadyExisting) {
      throw new AlreadyExistingException();
    }

    return this.clubRepository.save(club);
  }
}
