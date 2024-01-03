import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTDivision } from './egtDivision.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EGTDivisionService {
  @InjectRepository(EGTDivision)
  private egtDivisionRepository: Repository<EGTDivision>;

  findOne(id: number): Promise<EGTDivision | null> {
    return this.egtDivisionRepository.findOneBy({ id });
  }
}
