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

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([EGTStarterLink, EGTDivision]),
    BaseModule,
  ],
  providers: [
    EGTStarterLinkExtensionResolver,
    EGTStarterLinkResolver,
    EGTStarterLinkService,
    EGTDivisionService,
  ],
})
export class EGTModule {}
