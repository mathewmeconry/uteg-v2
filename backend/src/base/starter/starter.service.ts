import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starter } from './starter.entity';
import { Brackets, FindOptionsWhere, Repository } from 'typeorm';
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
    if (
      Object.values(filter).filter((value) => value != undefined).length === 0
    ) {
      throw new BadRequestException();
    }

    let queryBuilder = this.starterRepository
      .createQueryBuilder('starter')
      .leftJoinAndSelect(
        'starter.starter2competitions',
        'starter2competitions',
      );

    if (filter.competitionID) {
      queryBuilder = queryBuilder.andWhere(
        'starter2competitions.competition = :competition',
        {
          competition: filter.competitionID,
        },
      );
    }

    if (filter.sex) {
      queryBuilder = queryBuilder.andWhere('sex = :sex', { sex: filter.sex });
    }

    if (filter.category) {
      queryBuilder = queryBuilder.andWhere(
        'starter2competitions.category = :category',
        {
          category: filter.category,
        },
      );
    }

    if (filter.firstname || filter.lastname) {
      queryBuilder = queryBuilder.andWhere(
        new Brackets((qb) => {
          if (filter.firstname) {
            qb = qb.orWhere('firstname SOUNDS LIKE :firstname', {
              firstname: filter.firstname,
            });
          }
          if (filter.lastname) {
            qb = qb.orWhere('lastname SOUNDS LIKE :lastname', {
              lastname: filter.lastname,
            });
          }
        }),
      );
    }

    if (filter.stvID) {
      queryBuilder = queryBuilder.andWhere('stvID LIKE :stvID', {
        stvID: `${filter.stvID}%`,
      });
    }

    return queryBuilder
      .orderBy('firstname', 'ASC')
      .addOrderBy('lastname', 'ASC')
      .getMany();
  }

  findOne(id: number): Promise<Starter | null> {
    return this.starterRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.starterRepository.delete(id);
  }
}
