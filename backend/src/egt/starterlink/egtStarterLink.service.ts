import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTStarterLink } from './egtStarterLink.entity';
import { Repository } from 'typeorm';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';
import { EGTStarterLinkInput } from './egtStarterLink.types';
import { StarterLinkService } from 'src/base/starterLink/starterLink.service';
import { EGTDivisionService } from '../division/egtDivision.service';
import { EGTLineupService } from '../lineup/egtLineup.service';

@Injectable()
export class EGTStarterLinkService {
  @InjectRepository(EGTStarterLink)
  private egtStarterLinkRepository: Repository<EGTStarterLink>;

  @Inject()
  private egtDivisionService: EGTDivisionService;

  @Inject()
  private starterLinkService: StarterLinkService;

  @Inject()
  private egtLineupService: EGTLineupService;

  async create(
    linkData: EGTStarterLinkInput,
    ignoreDivision: boolean = false,
  ): Promise<EGTStarterLink> {
    if (linkData.divisionID && linkData.divisionNumber) {
      throw new BadRequestException();
    }

    if (!linkData.id && !linkData.starterLinkID) {
      throw new BadRequestException();
    }

    if (linkData.id && linkData.starterLinkID) {
      throw new BadRequestException();
    }

    let link: EGTStarterLink | null = null;
    if (linkData.starterLinkID) {
      link = await this.findByStarterLink(linkData.starterLinkID, true);
      if(link && link.deletedAt) {
        await this.egtStarterLinkRepository.restore(link.id);
        link = await this.findByStarterLink(linkData.starterLinkID);
      }
    }

    if (linkData.id) {
      link = await this.findOne(linkData.id, true);

      if (link && link.deletedAt) {
        await this.egtStarterLinkRepository.restore(link.id);
        link = await this.findOne(linkData.id);
      }
    }

    if (!link) {
      link = new EGTStarterLink();
    }

    if (!(await link.starterLink)) {
      link.starterLink = Promise.resolve(
        await this.starterLinkService.findOne(linkData.starterLinkID),
      );
    }

    if (linkData.divisionNumber) {
      if (!linkData.category) {
        throw new BadRequestException();
      }

      const starterLink = await link.starterLink;
      const starter = await starterLink.starter;
      const division = await this.egtDivisionService.findByNumber(
        (
          await starterLink.competition
        ).id,
        starter.sex,
        linkData.category,
        linkData.divisionNumber,
      );

      if (!division && !ignoreDivision) {
        throw new Error('Division not found');
      }
      if (division) {
        link.division = Promise.resolve(division);
      }
    }

    if (linkData.divisionID) {
      link.division = Promise.resolve(
        await this.egtDivisionService.findOne(linkData.divisionID),
      );
    }

    if (linkData.category) {
      link.category = linkData.category;
    }

    link.lineup = Promise.resolve(
      await this.egtLineupService.findOne(linkData.lineupID),
    );

    return this.save(link);
  }

  findOne(id: number, withDeleted = false): Promise<EGTStarterLink | null> {
    let qb = this.egtStarterLinkRepository.createQueryBuilder();

    if (withDeleted) {
      qb = qb.withDeleted();
    }

    return qb.where('id = :id', { id }).getOne();
  }

  findByStarterLink(
    id: number,
    withDeleted?: boolean,
  ): Promise<EGTStarterLink | null> {
    let qb = this.egtStarterLinkRepository.createQueryBuilder('egtStarterLink');

    if (withDeleted) {
      qb = qb.withDeleted();
    }

    return qb
      .leftJoin('egtStarterLink.starterLink', 'starterLink')
      .where('starterLink.id = :id', { id })
      .getOne();
  }

  findUnassignedForDivision(divisionID: number): Promise<EGTStarterLink[]> {
    return this.egtStarterLinkRepository
      .createQueryBuilder('egtStarterLink')
      .leftJoin('egtStarterLink.division', 'division')
      .where('division.id = :divisionID', { divisionID })
      .andWhere('egtStarterLink.lineup IS NULL')
      .getMany();
  }

  findByLineup(
    lineupId: number,
    withDeleted?: boolean,
  ): Promise<EGTStarterLink[]> {
    let qb = this.egtStarterLinkRepository.createQueryBuilder('est');

    if (withDeleted) {
      qb = qb.withDeleted();
    }

    return qb
      .leftJoinAndSelect('est.starterLink', 'starterLink')
      .where('est.lineup = :lineupId', { lineupId })
      .getMany();
  }

  async findByIds(
    ids: number[],
    withDeleted?: boolean,
  ): Promise<EGTStarterLink[]> {
    let qb = this.egtStarterLinkRepository.createQueryBuilder('est');

    if (withDeleted) {
      qb = qb.withDeleted();
    }

    const result = await qb.whereInIds(ids).getMany();
    // sort by requested IDs
    return ids.map((id) => result.find((el) => el.id == id));
  }

  async findByDivisionIDs(
    ids: number[],
    withDeleted?: boolean,
  ): Promise<EGTStarterLink[]> {
    let qb = this.egtStarterLinkRepository.createQueryBuilder('est');
    if (withDeleted) {
      qb = qb.withDeleted();
    }

    qb.leftJoinAndSelect('est.division', 'division');
    qb.where('est.division.id IN (:...ids)', { ids });
    return qb.getMany();
  }

  async save(starterLink: EGTStarterLink): Promise<EGTStarterLink> {
    return this.egtStarterLinkRepository.save(starterLink);
  }

  async onStarterLinkDelete(starterLink: StarterLink): Promise<void> {
    const link = await this.findByStarterLink(starterLink.id);
    await this.egtStarterLinkRepository.softRemove(link);
  }
}
