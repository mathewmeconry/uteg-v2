import { Injectable, Logger } from '@nestjs/common';
import { Competition } from '../competition/competition.entity';
import { StarterLink } from '../starterLink/starterLink.entity';

@Injectable()
export class ModuleService {
  private registeredModules: ModuleRegistration[] = [];

  private readonly logger = new Logger(ModuleService.name);

  registerModule(module: ModuleRegistration) {
    if (this.getModule(module.name)) {
      throw new Error(`Module ${module.name} already registered`);
    }
    this.registeredModules.push(module);
    this.logger.log(`Registered module ${module.name}`);
  }

  getModule(name: string): ModuleRegistration {
    return this.registeredModules.find(
      (m) => m.name.toLowerCase() === name.toLowerCase(),
    );
  }

  onCompetitionInit(competition: Competition) {
    for (const module of competition.modules) {
      const moduleRegistration = this.getModule(module);
      if (moduleRegistration) {
        if (moduleRegistration.onCompetitionInit) {
          moduleRegistration.onCompetitionInit(competition);
        }
      }
    }
  }

  onStarterLinkDelete(competition: Competition, starterLink: StarterLink) {
    for (const module of competition.modules) {
      const moduleRegistration = this.getModule(module);
      if (moduleRegistration) {
        if (moduleRegistration.onStarterLinkDelete) {
          moduleRegistration.onStarterLinkDelete(starterLink);
        }
      }
    }
  }
}

export type ModuleRegistration = {
  name: string;
  onCompetitionInit?: (competition: Competition) => void | Promise<void>;
  onStarterLinkDelete?: (starterLink: StarterLink) => void | Promise<void>;
};
