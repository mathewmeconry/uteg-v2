import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradeService {
  @InjectRepository(Grade)
  private gradeRepository: Repository<Grade>;

  findAll(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  findOne(id: number): Promise<Grade | null> {
    return this.gradeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.gradeRepository.delete(id);
  }
}
