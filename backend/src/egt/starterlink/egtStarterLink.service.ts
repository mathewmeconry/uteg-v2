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
      link = await this.findByStarterLink(linkData.starterLinkID);
    }

    if (linkData.id) {
      link = await this.findOne(linkData.id, true);

      if (link.deletedAt) {
        await this.egtStarterLinkRepository.restore(link.id);
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

  findByStarterLink(id: number): Promise<EGTStarterLink | null> {
    return this.egtStarterLinkRepository
      .createQueryBuilder('egtStarterLink')
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
    includeDeleted?: boolean,
  ): Promise<EGTStarterLink[]> {
    let qb = this.egtStarterLinkRepository.createQueryBuilder('est');

    if (includeDeleted) {
      qb = qb.withDeleted();
    }

    return qb
      .leftJoinAndSelect('est.starterLink', 'starterLink')
      .where('est.lineup = :lineupId', { lineupId })
      .getMany();
  }

  async save(starterLink: EGTStarterLink): Promise<EGTStarterLink> {
    return this.egtStarterLinkRepository.save(starterLink);
  }

  async onStarterLinkDelete(starterLink: StarterLink): Promise<void> {
    await this.egtStarterLinkRepository
      .createQueryBuilder()
      .softDelete()
      .from(EGTStarterLink)
      .where('starterLink = :starterLink', { starterLink: starterLink.id })
      .execute();
  }
}
