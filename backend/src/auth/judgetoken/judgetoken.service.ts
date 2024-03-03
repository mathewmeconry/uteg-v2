import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Judgetoken } from './judgetoken.entity';
import { Repository } from 'typeorm';
import { Competition } from 'src/base/competition/competition.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class JudgetokenService {
  @InjectRepository(Judgetoken)
  private judgetokenRepository: Repository<Judgetoken>;

  findAll(): Promise<Judgetoken[]> {
    return this.judgetokenRepository.find();
  }

  findOne(id: number): Promise<Judgetoken | null> {
    return this.judgetokenRepository.findOneBy({ id });
  }

  findByToken(token: string): Promise<Judgetoken | null> {
    return this.judgetokenRepository.findOneBy({ token });
  }

  create(
    competitionId: number,
    ground: number,
    deviceNumber: number,
  ): Promise<Judgetoken> {
    const newToken = new Judgetoken();
    const competition = new Competition();
    competition.id = competitionId;
    newToken.competition = Promise.resolve(competition);
    newToken.device = deviceNumber;
    newToken.ground = ground;
    newToken.token = randomUUID();
    return this.judgetokenRepository.save(newToken);
  }

  findByCompetition(
    competitionId: number,
    ground: number,
    deviceNumber: number,
  ): Promise<Judgetoken | null> {
    return this.judgetokenRepository.findOne({
      where: {
        competition: {
          id: competitionId,
        },
        device: deviceNumber,
        ground,
      },
    });
  }

  async findOrCreate(
    competitionId: number,
    ground: number,
    deviceNumber: number,
  ): Promise<Judgetoken> {
    const judgetoken = await this.judgetokenRepository.findOne({
      where: {
        competition: {
          id: competitionId,
        },
        device: deviceNumber,
        ground,
      },
    });

    if (judgetoken) {
      return judgetoken;
    }

    return this.create(competitionId, ground, deviceNumber);
  }

  async remove(id: number): Promise<void> {
    await this.judgetokenRepository.delete(id);
  }

  async resetToken(id: number): Promise<Judgetoken> {
    let judgeToken = await this.findOne(id);
    judgeToken.token = randomUUID();
    return this.judgetokenRepository.save(judgeToken);
  }
}
