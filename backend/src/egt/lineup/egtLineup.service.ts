import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTLineup } from './egtLineup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EGTLineupService {
  @InjectRepository(EGTLineup)
  private egtLineupRepository: Repository<EGTLineup>;

  findOne(id: number): Promise<EGTLineup | null> {
    if (!id) {
      return null;
    }
    return this.egtLineupRepository.findOneBy({ id });
  }

  findForDivision(divisionID: number): Promise<EGTLineup[]> {
    return this.egtLineupRepository
      .createQueryBuilder('lineup')
      .leftJoin('lineup.division', 'division')
      .where('division.id = :divisionID', { divisionID })
      .getMany();
  }

  findForDivisionAndDeviceNumber(
    divisionID: number,
    device: number,
  ): Promise<EGTLineup> {
    return this.egtLineupRepository
      .createQueryBuilder('lineup')
      .leftJoin('lineup.division', 'division')
      .leftJoin('lineup.device', 'device')
      .where('division.id = :divisionID', { divisionID })
      .andWhere('device.deviceNumber = :device', { device })
      .getOne();
  }

  create(lineup: EGTLineup): Promise<EGTLineup> {
    return this.egtLineupRepository.save(lineup);
  }
}
