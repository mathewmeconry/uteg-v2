import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarterLink } from './starterLink.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StarterLinkService {
  @InjectRepository(StarterLink)
  private starterLinkRepository: Repository<StarterLink>;

  create(
    starterLink: StarterLink,
  ): Promise<StarterLink> {
    return this.starterLinkRepository.save(starterLink);
  }

  findAll(): Promise<StarterLink[]> {
    return this.starterLinkRepository.find();
  }

  findOne(id: number): Promise<StarterLink | null> {
    return this.starterLinkRepository.findOneBy({ id });
  }

  findForCompetition(
    starterID: number,
    competitionID: number,
  ): Promise<StarterLink | null> {
    return this.starterLinkRepository.findOneBy({
      competition: {
        id: competitionID,
      },
      starter: {
        id: starterID,
      },
    });
  }

  findForStarter(starterID: number): Promise<StarterLink[]> {
    return this.starterLinkRepository.find({
      relations: ['starter'],
      where: {
        starter: {
          id: starterID,
        },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.starterLinkRepository.delete(id);
  }
}
