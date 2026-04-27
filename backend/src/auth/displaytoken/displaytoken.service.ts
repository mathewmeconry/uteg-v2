import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Displaytoken } from './displaytoken.entity';
import { Repository } from 'typeorm';
import { Competition } from 'src/base/competition/competition.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class DisplaytokenService {
  @InjectRepository(Displaytoken)
  private displaytokenRepository: Repository<Displaytoken>;

  findAll(competitionId: number): Promise<Displaytoken[]> {
    return this.displaytokenRepository.find({
      where: {
        competition: {
          id: competitionId,
        },
      },
    });
  }

  findOne(id: number): Promise<Displaytoken | null> {
    return this.displaytokenRepository.findOneBy({ id });
  }

  findByToken(token: string): Promise<Displaytoken | null> {
    return this.displaytokenRepository.findOneBy({ token });
  }

  create(competitionId: number, ground: number): Promise<Displaytoken> {
    const newToken = new Displaytoken();
    const competition = new Competition();
    competition.id = competitionId;
    newToken.competition = Promise.resolve(competition);
    newToken.ground = ground;
    newToken.token = randomUUID();
    return this.displaytokenRepository.save(newToken);
  }

  findByCompetition(
    competitionId: number,
    ground: number,
  ): Promise<Displaytoken | null> {
    return this.displaytokenRepository.findOne({
      where: {
        competition: {
          id: competitionId,
        },
        ground,
      },
    });
  }

  async findOrCreate(
    competitionId: number,
    ground: number,
  ): Promise<Displaytoken> {
    const displaytoken = await this.displaytokenRepository.findOne({
      where: {
        competition: {
          id: competitionId,
        },
        ground,
      },
    });

    if (displaytoken) {
      return displaytoken;
    }

    return this.create(competitionId, ground);
  }

  async remove(id: number): Promise<void> {
    await this.displaytokenRepository.delete(id);
  }

  async resetToken(id: number): Promise<Displaytoken> {
    let judgeToken = await this.findOne(id);
    judgeToken.token = randomUUID();
    return this.displaytokenRepository.save(judgeToken);
  }
}
