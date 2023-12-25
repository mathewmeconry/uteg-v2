import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starter } from './starter/starter.entity';
import { StarterResolver } from './starter/starter.resolver';
import { Club } from './club/club.entity';
import { Competition } from './competition/competition.entity';
import { Grade } from './grade/grade.entity';
import { Judgetoken } from './judgetoken/judgetoken.entity';
import { Starter2Competition } from './starter2competition/starter2competition.entity';
import { ClubResolver } from './club/club.resolver';
import { CompetitionResolver } from './competition/competition.resolver';
import { GradeResolver } from './grade/grade.resolver';
import { JudgetokenResolver } from './judgetoken/judgetoken.resolver';
import { Starter2CompetitionResolver } from './starter2competition/starter2competition.resolver';
import { StarterService } from './starter/starter.service';
import { ClubService } from './club/club.service';
import { CompetitionService } from './competition/competition.service';
import { GradeService } from './grade/grade.service';
import { JudgetokenService } from './judgetoken/judgetoken.service';
import { Starter2CompetitionService } from './starter2competition/starter2competition.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Club,
      Competition,
      Grade,
      Judgetoken,
      Starter,
      Starter2Competition,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [
    ClubResolver,
    CompetitionResolver,
    GradeResolver,
    JudgetokenResolver,
    StarterResolver,
    Starter2CompetitionResolver,
    ClubService,
    CompetitionService,
    GradeService,
    JudgetokenService,
    StarterService,
    Starter2CompetitionService,
  ],
})
export class BaseModule {}
