import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTLineup } from './egtLineup.entity';
import { In, Repository } from 'typeorm';

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

  findMany(ids: number[]): Promise<EGTLineup[]> {
    return this.egtLineupRepository.findBy({ id: In(ids) });
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

  async advanceRounds(
    ids: number[],
    round: number,
    override: boolean,
  ): Promise<EGTLineup[]> {
    return Promise.all(ids.map((id) => this.advanceRound(id, round, override)));
  }

  async advanceRound(
    id: number,
    round: number,
    override: boolean,
  ): Promise<EGTLineup> {
    const lineup = await this.findOne(id);
    if (!lineup) {
      throw new NotFoundException();
    }

    if (override || round > lineup.currentRound) {
      lineup.currentRound = round;
      await this.egtLineupRepository.save(lineup);
    }
    return lineup;
  }
}
