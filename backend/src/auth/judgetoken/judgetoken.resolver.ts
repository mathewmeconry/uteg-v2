import {
  Resolver,
  Query,
  Args,
  ID,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Judgetoken } from './judgetoken.entity';
import { Role } from '../decorators/role.decorator';
import { ROLES } from '../types';
import { Inject, UseGuards } from '@nestjs/common';
import { JudgetokenService } from './judgetoken.service';
import { JudgetokenGuard } from './judgetoken.guard';
import { RoleGuard } from '../guards/role.guard';
import { AuthService } from '../auth.service';

@Resolver(() => Judgetoken)
@UseGuards(JudgetokenGuard, RoleGuard)
export class JudgetokenResolver {
  @Inject()
  private readonly judgetokenService: JudgetokenService;

  @Inject()
  private readonly auth: AuthService;

  @Role(ROLES.ADMIN)
  @Query(() => Judgetoken, { name: 'judgeToken' })
  async getOne(@Args('id') id: number): Promise<Judgetoken> {
    return this.judgetokenService.findOne(id);
  }

  @Role(ROLES.ADMIN)
  @Query(() => Judgetoken, { name: 'findJudgeToken', nullable: true })
  async findeOne(
    @Args('competitionID', { type: () => ID }) competitionId: number,
    @Args('ground') ground: number,
    @Args('device') deviceNumber: number,
    @Args('create', { defaultValue: false }) create: boolean,
  ): Promise<Judgetoken | null> {
    if (create) {
      return this.judgetokenService.findOrCreate(
        competitionId,
        ground,
        deviceNumber,
      );
    }
    return this.judgetokenService.findByCompetition(
      competitionId,
      ground,
      deviceNumber,
    );
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => Judgetoken, { name: 'resetJudgeToken' })
  async resetToken(@Args('id', { type: () => ID }) id: number): Promise<Judgetoken> {
    return this.judgetokenService.resetToken(id);
  }
}
