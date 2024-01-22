import { Inject, Module, OnModuleInit } from '@nestjs/common';
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
import { EGTDeviceService } from './device/egtDevice.service';
import { EGTDevice } from './device/egtDevice.entity';
import { ModuleService } from 'src/base/modules/module.service';
import { Competition } from 'src/base/competition/competition.entity';
import { EGTDeviceResolver } from './device/egtDevice.resolver';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EGTStarterLink,
      EGTDivision,
      EGTLineup,
      EGTDevice,
    ]),
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
    EGTDeviceService,
    EGTDeviceResolver,
  ],
})
export class EGTModule implements OnModuleInit {
  @Inject()
  private moduleService: ModuleService;

  @Inject()
  private deviceService: EGTDeviceService;

  onModuleInit() {
    this.moduleService.registerModule({
      name: 'EGT',
      competitionInitFunction: this.initCompetition.bind(this),
    });
  }

  private async initCompetition(competition: Competition) {
    await this.deviceService.initCompetition(competition);
  }
}
