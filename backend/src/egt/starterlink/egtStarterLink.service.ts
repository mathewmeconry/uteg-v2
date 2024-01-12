import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTStarterLink } from './egtStarterLink.entity';
import { Repository } from 'typeorm';
import { AlreadyExistingException } from 'src/base/exceptions/AlreadyExisting';

@Injectable()
export class EGTStarterLinkService {
  @InjectRepository(EGTStarterLink)
  private egtStarterLinkRepository: Repository<EGTStarterLink>;

  findOne(id: number): Promise<EGTStarterLink | null> {
    return this.egtStarterLinkRepository.findOneBy({ id });
  }

  findByStarterLink(id: number): Promise<EGTStarterLink | null> {
    return this.egtStarterLinkRepository
      .createQueryBuilder('egtStarterLink')
      .leftJoin('egtStarterLink.starterLink', 'starterLink')
      .where('starterLink.id = :id', { id })
      .getOne();
  }

  async save(starterLink: EGTStarterLink): Promise<EGTStarterLink> {
    return this.egtStarterLinkRepository.save(starterLink);
  }
}
