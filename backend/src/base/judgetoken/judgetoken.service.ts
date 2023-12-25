import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Judgetoken } from './judgetoken.entity';
import { Repository } from 'typeorm';

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

  async remove(id: number): Promise<void> {
    await this.judgetokenRepository.delete(id);
  }
}
