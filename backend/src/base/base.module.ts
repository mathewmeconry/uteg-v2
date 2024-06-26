import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starter } from './starter/starter.entity';
import { StarterResolver } from './starter/starter.resolver';
import { Club } from './club/club.entity';
import { Competition } from './competition/competition.entity';
import { Grade } from './grade/grade.entity';
import { StarterLink } from './starterLink/starterLink.entity';
import { ClubResolver } from './club/club.resolver';
import { CompetitionResolver } from './competition/competition.resolver';
import { GradeResolver } from './grade/grade.resolver';
import { StarterLinkResolver } from './starterLink/starterLink.resolver';
import { StarterService } from './starter/starter.service';
import { ClubService } from './club/club.service';
import { CompetitionService } from './competition/competition.service';
import { GradeService } from './grade/grade.service';
import { StarterLinkService } from './starterLink/starterLink.service';
import { AuthModule } from 'src/auth/auth.module';
import { ModuleService } from './modules/module.service';
import { ConfigModule } from 'src/config/config.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([Club, Competition, Grade, Starter, StarterLink]),
    FileModule,
  ],
  exports: [
    TypeOrmModule,
    ClubService,
    CompetitionService,
    GradeService,
    StarterService,
    StarterLinkService,
    ModuleService,
  ],
  providers: [
    ClubResolver,
    CompetitionResolver,
    GradeResolver,
    StarterResolver,
    StarterLinkResolver,
    ClubService,
    CompetitionService,
    GradeService,
    StarterService,
    StarterLinkService,
    ModuleService,
  ],
})
export class BaseModule {}
