import { Query, Resolver } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionService } from './competition.service';
import { Inject } from '@nestjs/common';

@Resolver(() => Competition)
export class CompetitionResolver {
    @Inject()
    private competitionService: CompetitionService;
  
    @Query(() => [Competition], { name: 'competitions' })
    async findAll(): Promise<Competition[]> {
      return this.competitionService.findAll();
    }
}
