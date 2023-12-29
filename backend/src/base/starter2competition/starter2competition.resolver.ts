import { Args, Query, Resolver } from '@nestjs/graphql';
import { Starter2Competition } from './starter2competition.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { Starter2CompetitionService } from './starter2competition.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/auth/types';
import { Role } from 'src/auth/decorators/role.decorator';
import { Starter2CompetitionGuard } from './starter2competition.guard';

@Resolver(() => Starter2Competition)
@UseGuards(Starter2CompetitionGuard, RoleGuard)
export class Starter2CompetitionResolver {
  @Inject()
  private starter2competitionService: Starter2CompetitionService;

  @Role(ROLES.VIEWER)
  @Query(() => Starter2Competition, {
    name: 'starter2competition',
    nullable: true,
  })
  async findById(@Args('id') id: number): Promise<Starter2Competition | null> {
    return this.starter2competitionService.findOne(id);
  }
}
