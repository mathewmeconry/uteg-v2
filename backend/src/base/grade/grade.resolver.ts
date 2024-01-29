import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Grade } from './grade.entity';
import { GradeService } from './grade.service';
import { Inject, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { GradeGuard } from './grade.guard';
import { GradeInput } from './grade.types';

@Resolver(() => Grade)
@UseGuards(GradeGuard, RoleGuard)
export class GradeResolver {
  @Inject()
  private gradeService: GradeService;

  @Role(ROLES.VIEWER)
  @Query(() => [Grade], { name: 'grades' })
  async findAll(): Promise<Grade[]> {
    return this.gradeService.findAll();
  }

  @Role(ROLES.VIEWER)
  @Query(() => [Grade], {name: 'starterGrades'})
  async findForStarters(
    @Args('starterlinkIds', {type: () => [ID]}) starterlinkIds: number[],
    @Args('device', {type: () => Int, nullable: true}) device?: number
  ): Promise<Grade[]> {
    return this.gradeService.findForStarters(starterlinkIds, device)
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => [Grade], { name: 'addGrades' })
  async addBulk(
    @Args('grades', { type: () => [GradeInput] }) grades: GradeInput[],
  ): Promise<Grade[]> {
    return this.gradeService.saveBulk(grades);
  }
}
