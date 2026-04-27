import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Grade, GradePubSub, GradePubSubEvents } from './grade.entity';
import { GradeService } from './grade.service';
import { Inject, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { GradeGuard } from './grade.guard';
import { GradeFilterInput, GradeInput } from './grade.types';
import { Judge } from 'src/auth/decorators/judge.decorator';

@Resolver(() => Grade)
@UseGuards(GradeGuard, RoleGuard)
export class GradeResolver {
  @Inject()
  private gradeService: GradeService;

  @Inject()
  private gradeGuard: GradeGuard;

  @Role(ROLES.JUDGE)
  @Query(() => [Grade], { name: 'grades' })
  async findAll(): Promise<Grade[]> {
    return this.gradeService.findAll();
  }

  @Role(ROLES.JUDGE)
  @Query(() => [Grade], { name: 'starterGrades' })
  async findForStarters(
    @Args('starterlinkIds', { type: () => [ID] }) starterlinkIds: number[],
    @Args('device', { type: () => Int, nullable: true }) device?: number,
  ): Promise<Grade[]> {
    return this.gradeService.findForStarters(starterlinkIds, device);
  }

  @Role(ROLES.ADMIN)
  @Judge()
  @Mutation(() => [Grade], { name: 'addGrades' })
  async addBulk(
    @Args('grades', { type: () => [GradeInput] }) grades: GradeInput[],
  ): Promise<Grade[]> {
    return this.gradeService.saveBulk(grades);
  }

  @Role(ROLES.DISPLAY)
  @Subscription(() => Grade, {
    name: 'grade',
    async filter(
      this: GradeResolver,
      payload: Grade,
      variables: { filter: GradeFilterInput },
      context,
    ) {
      if (!variables.filter.starterlinkIds) {
        return false;
      }

      const starter = await payload.starterlink;
      if (variables.filter.starterlinkIds.includes(starter.id.toString())) {
        return this.gradeGuard.canAccess([payload], context);
      }
      return false;
    },
    resolve: (payload) => payload,
  })
  subscription(
    @Args('filter') filter: GradeFilterInput,
  ): AsyncIterable<Grade, any, undefined> {
    return GradePubSub.asyncIterableIterator([
      GradePubSubEvents.CREATE,
      GradePubSubEvents.UPDATE,
    ]);
  }
}
