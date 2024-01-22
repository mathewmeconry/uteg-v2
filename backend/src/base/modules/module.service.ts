import { Injectable, Logger } from '@nestjs/common';
import { Competition } from '../competition/competition.entity';

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
    return this.registeredModules.find((m) => m.name.toLowerCase() === name.toLowerCase());
  }

  initCompetition(competition: Competition) {
    for (const module of competition.modules) {
      const moduleRegistration = this.getModule(module);
      if (moduleRegistration) {
        if (moduleRegistration.competitionInitFunction) {
          moduleRegistration.competitionInitFunction(competition);
        }
      }
    }
  }
}

export type ModuleRegistration = {
  name: string;
  competitionInitFunction?: (competition: Competition) => void | Promise<void>;
};
