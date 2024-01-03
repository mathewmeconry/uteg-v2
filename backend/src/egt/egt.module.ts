import { Module } from '@nestjs/common';
import { EGTStarterLinkExtensionResolver } from './starterLinkExtension/starterLink.resolver.extension';
import { EGTStarterLinkService } from './starterlink/egtStarterLink.service';
import { EGTStarterLink } from './starterlink/egtStarterLink.entity';
import { EGTDivision } from './division/egtDivision.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { EGTDivisionService } from './division/egtDivision.service';
import { EGTStarterLinkResolver } from './starterlink/egtStarterLink.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { EGTLineup } from './lineup/egtLineup.entity';
import { EGTDivisionResolver } from './division/egtDivision.resolver';
import { EGTLineupService } from './lineup/egtLineup.service';
import { EGTLineupResolver } from './lineup/egtLineup.resolver';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([EGTStarterLink, EGTDivision, EGTLineup]),
    BaseModule,
  ],
  providers: [
    EGTStarterLinkExtensionResolver,
    EGTStarterLinkResolver,
    EGTStarterLinkService,
    EGTDivisionService,
    EGTDivisionResolver,
    EGTLineupService,
    EGTLineupResolver,
  ],
})
export class EGTModule {}
