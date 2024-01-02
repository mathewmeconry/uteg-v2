import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarterLink } from './starterLink.entity';
import { Repository } from 'typeorm';
import { AlreadyExistingException } from '../exceptions/AlreadyExisting';
import { UpdateStarterLinkInput } from './starterLink.types';
import { ClubService } from '../club/club.service';
import { SEX } from '../starter/starter.types';

@Injectable()
export class StarterLinkService {
  @InjectRepository(StarterLink)
  private starterLinkRepository: Repository<StarterLink>;

  @Inject()
  private clubService: ClubService;

  async create(starterLink: StarterLink): Promise<StarterLink> {
    const alreadyExisting = await this.starterLinkRepository.findOne({
      where: {
        competition: {
          id: (await starterLink.competition).id,
        },
        starter: {
          id: (await starterLink.starter).id,
        },
      },
    });
    if (alreadyExisting) {
      throw new AlreadyExistingException();
    }

    return this.starterLinkRepository.save(starterLink);
  }

  async update(id: number, data: UpdateStarterLinkInput): Promise<StarterLink> {
    const starterLink = await this.findOne(id);
    if (!starterLink) {
      throw new NotFoundException();
    }

    const club = await this.clubService.findOne(data.clubID);
    if (!club) {
      throw new NotFoundException();
    }
    starterLink.club = Promise.resolve(club);
    return this.starterLinkRepository.save(starterLink);
  }

  async remove(id: number): Promise<StarterLink> {
    const starterLink = await this.findOne(id);
    if (!starterLink) {
      throw new NotFoundException();
    }
    const cloned = {...starterLink}
    await this.starterLinkRepository.remove(starterLink);
    return cloned;
  }

  findAll(): Promise<StarterLink[]> {
    return this.starterLinkRepository.find();
  }

  find(competitionID: number, sex?: SEX): Promise<StarterLink[]> {
    const qb = this.starterLinkRepository
      .createQueryBuilder('starterLink')
      .leftJoin('starterLink.competition', 'competition')
      .where('competition.id = :competition', {
        competition: competitionID,
      });

    if (sex) {
      qb.leftJoin('starterLink.starter', 'starter').andWhere(
        'starter.sex = :sex',
        { sex: SEX[sex] },
      );
    }

    return qb.getMany();
  }

  findAllForCompetition(competitionID: number): Promise<StarterLink[]> {
    return this.starterLinkRepository.find({
      where: {
        competition: {
          id: competitionID,
        },
      },
    });
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
}
