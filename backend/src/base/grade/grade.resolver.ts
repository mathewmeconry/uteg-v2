import { Query, Resolver } from '@nestjs/graphql';
import { Grade } from './grade.entity';
import { GradeService } from './grade.service';
import { Inject } from '@nestjs/common';

@Resolver(() => Grade)
export class GradeResolver {  
    @Inject()
    private gradeService: GradeService;
  
    @Query(() => [Grade], { name: 'grades' })
    async findAll(): Promise<Grade[]> {
      return this.gradeService.findAll();
    }}
