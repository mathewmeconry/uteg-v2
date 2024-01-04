import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTDivision } from './egtDivision.entity';
import { Repository } from 'typeorm';
import { SEX } from 'src/base/starter/starter.types';
import { EGTDivisionFilterInput } from './egtDivision.types';

@Injectable()
export class EGTDivisionService {
  @InjectRepository(EGTDivision)
  private egtDivisionRepository: Repository<EGTDivision>;

  findOne(id: number): Promise<EGTDivision | null> {
    return this.egtDivisionRepository.findOneBy({ id });
  }

  findAll(filter: EGTDivisionFilterInput): Promise<EGTDivision[]> {
    const qb = this.egtDivisionRepository
      .createQueryBuilder('division')
      .leftJoin('division.competition', 'competition')
      .where('competition.id = :competitionID', {
        competitionID: filter.competitionID,
      });

    if (filter.category) {
      qb.andWhere('division.category = :category', {
        category: filter.category,
      });
    }

    if (filter.sex) {
      qb.andWhere('division.sex = :sex', { sex: filter.sex });
    }

    return qb.orderBy('category', 'ASC').addOrderBy('number', 'ASC').getMany();
  }

  async create(division: EGTDivision): Promise<EGTDivision> {
    // there are max. 8 categories supported (K1-KD/H)
    if (division.category > 8) {
      throw new BadRequestException();
    }
    const competition = await division.competition;

    if (division.ground > competition.grounds) {
      throw new BadRequestException();
    }

    division.number = await this.getNextDivisionNumber(
      competition.id,
      division.category,
      division.sex,
    );

    return this.egtDivisionRepository.save(division);
  }

  async remove(id: number): Promise<EGTDivision> {
    const division = await this.findOne(id);
    if (!division) {
      throw new NotFoundException();
    }

    const cloned = { ...division };
    const competition = await division.competition;
    await this.egtDivisionRepository.remove(division);
    await this.renumberDivisions(competition.id, cloned.category, cloned.sex);
    return cloned;
  }

  async getNextDivisionNumber(
    competitionID: number,
    category: number,
    sex: SEX,
  ): Promise<number> {
    const lastdivision = await this.egtDivisionRepository
      .createQueryBuilder('division')
      .leftJoin('division.competition', 'competition')
      .where('competition.id = :competitionID', { competitionID })
      .andWhere('division.sex = :sex', { sex })
      .andWhere('division.category = :category', { category })
      .orderBy('division.id', 'DESC')
      .getOne();

    if (!lastdivision) {
      return 1;
    }

    return lastdivision.number + 1;
  }

  async renumberDivisions(
    competitionID: number,
    category: number,
    sex: SEX,
  ): Promise<void> {
    const divisions = await this.egtDivisionRepository
      .createQueryBuilder('division')
      .leftJoin('division.competition', 'competition')
      .where('competition.id = :competitionID', { competitionID })
      .andWhere('division.sex = :sex', { sex })
      .andWhere('division.category = :category', { category })
      .orderBy('division.id', 'ASC')
      .getMany();

    for (let i = 1; i < divisions.length + 1; i++) {
      divisions[i - 1].number = i;
    }

    await this.egtDivisionRepository.save(divisions);
  }
}
