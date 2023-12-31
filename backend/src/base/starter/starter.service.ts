import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starter } from './starter.entity';
import { Brackets, Repository } from 'typeorm';
import { StarterFilter, UpdateStarterInput } from './starter.types';

export const AllowedStarterFields = [
  'stvID',
  'firstname',
  'lastname',
  'birthyear',
  'sex',
];

@Injectable()
export class StarterService {
  @InjectRepository(Starter)
  private starterRepository: Repository<Starter>;

  async create(starter: Starter): Promise<Starter> {
    if (!starter.stvID) {
      starter.stvID = undefined;
    }

    const alreadyExisting = await this.findDuplicate(starter);

    if (alreadyExisting) {
      return alreadyExisting;
    }

    return this.starterRepository.save(starter);
  }

  async update(id: number, data: UpdateStarterInput): Promise<Starter> {
    const starter = await this.findOne(id);
    if (!starter) {
      throw new NotFoundException();
    }

    for (const key of AllowedStarterFields) {
      if (data[key] !== undefined) {
        starter[key] = data[key];
      }
    }

    const duplicate = await this.findDuplicate(starter, true);
    if (duplicate) {
      return duplicate;
    }

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
      .leftJoin('starter.starterLinks', 'starterLinks');

    if (filter.competitionID) {
      queryBuilder = queryBuilder.andWhere(
        'starterLinks.competition = :competition',
        {
          competition: filter.competitionID,
        },
      );
    }

    if (filter.sex) {
      queryBuilder = queryBuilder.andWhere('sex = :sex', { sex: filter.sex });
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

  findDuplicate(
    starter: Starter,
    ignoreStvID: boolean = false,
  ): Promise<Starter | undefined> {
    const qb = this.starterRepository.createQueryBuilder('starter').orWhere(
      new Brackets((qb) => {
        qb.where('LOWER(firstname) = LOWER(:firstname)', {
          firstname: starter.firstname,
        })
          .andWhere('LOWER(lastname) = LOWER(:lastname)', {
            lastname: starter.lastname,
          })
          .andWhere('birthyear = :birthyear', {
            birthyear: starter.birthyear,
          })
          .andWhere('sex = :sex', { sex: starter.sex });
      }),
    );

    if (!ignoreStvID) {
      qb.orWhere('LOWER(stvID) = LOWER(:stvID)', {
        stvID: starter.stvID || '',
      });
    }

    return qb.getOne();
  }
}
