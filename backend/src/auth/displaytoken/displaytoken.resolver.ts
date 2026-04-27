import {
  Resolver,
  Query,
  Args,
  ID,
  Mutation,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { Displaytoken } from './displaytoken.entity';
import { Role } from '../decorators/role.decorator';
import { ROLES } from '../types';
import { Inject, UseGuards } from '@nestjs/common';
import { DisplaytokenService } from './displaytoken.service';
import { DisplaytokenGuard } from './displaytoken.guard';
import { RoleGuard } from '../guards/role.guard';
import { AuthService } from '../auth.service';
import { Competition } from 'src/base/competition/competition.entity';

@Resolver(() => Displaytoken)
@UseGuards(DisplaytokenGuard, RoleGuard)
export class DisplaytokenResolver {
  @Inject()
  private readonly displaytokenService: DisplaytokenService;

  @Inject()
  private readonly auth: AuthService;

  @Role(ROLES.ADMIN)
  @Mutation(() => Displaytoken, { name: 'createDisplayToken' })
  async create(
    @Args('competitionID', { type: () => ID }) competitionId: number,
    @Args('ground') ground: number,
  ): Promise<Displaytoken> {
    return this.displaytokenService.create(competitionId, ground);
  }

  @Role(ROLES.DISPLAY)
  @Query(() => Displaytoken, { name: 'displayToken' })
  async getOne(@Args('id', { type: () => ID }) id: number): Promise<Displaytoken> {
    return this.displaytokenService.findOne(id);
  }

  @Role(ROLES.ADMIN)
  @Query(() => [Displaytoken], { name: 'displayTokens' })
  async getAll(
    @Args('competitionID', { type: () => ID }) competitionId: number,
  ): Promise<Displaytoken[]> {
    return this.displaytokenService.findAll(competitionId);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => Displaytoken, { name: 'displayToken' })
  async resetToken(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Displaytoken> {
    return this.displaytokenService.resetToken(id);
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => Boolean, { name: 'deleteDisplayToken' })
  async deleteToken(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    try {
      await this.displaytokenService.remove(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Role(ROLES.DISPLAY)
  @ResolveField(() => Competition)
  async competition(@Root() displaytoken: Displaytoken) {
    return await displaytoken.competition
  }
}
