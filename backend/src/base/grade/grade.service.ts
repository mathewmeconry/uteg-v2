import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { Repository } from 'typeorm';
import { GradeInput } from './grade.types';
import { StarterLinkService } from '../starterLink/starterLink.service';

@Injectable()
export class GradeService {
  @InjectRepository(Grade)
  private gradeRepository: Repository<Grade>;

  @Inject()
  private starterlinkService: StarterLinkService;

  findAll(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  findOne(id: number): Promise<Grade | null> {
    return this.gradeRepository.findOneBy({ id });
  }

  findForStarter(starterlinkId: number): Promise<Grade[]> {
    return this.findForStarters([starterlinkId]);
  }

  findForStarters(starterlinkIds: number[], device?: number): Promise<Grade[]> {
    if (starterlinkIds.length === 0) {
      return Promise.resolve([]);
    }

    const qb = this.gradeRepository
      .createQueryBuilder('grade')
      .leftJoin('grade.starterlink', 'starterlink')
      .where('starterlink.id IN (:...starterlinkIds)', { starterlinkIds });

    if (!isNaN(device)) {
      qb.andWhere('grade.deviceNumber = :device', { device });
    }

    return qb.getMany();
  }

  async remove(id: number): Promise<void> {
    await this.gradeRepository.delete(id);
  }

  async saveBulk(grades: GradeInput[]): Promise<Grade[]> {
    return Promise.all(
      grades.map(async (grade) => {
        const newGrade =
          (await this.findForStarterAndDevice(
            grade.starterlinkId,
            grade.deviceNumber,
          )) ?? new Grade();
        newGrade.starterlink = Promise.resolve(
          await this.starterlinkService.findOne(grade.starterlinkId),
        );
        newGrade.value = grade.value;
        newGrade.deviceNumber = grade.deviceNumber;
        newGrade.module = grade.module;
        return this.gradeRepository.save(newGrade);
      }),
    );
  }

  async findForStarterAndDevice(
    starterlinkId: number,
    device: number,
  ): Promise<Grade | null> {
    return this.gradeRepository
      .createQueryBuilder('grade')
      .leftJoin('grade.starterlink', 'starterlink')
      .where('starterlink.id = :starterlinkId', { starterlinkId })
      .andWhere('grade.deviceNumber = :device', { device })
      .getOne();
  }
}
