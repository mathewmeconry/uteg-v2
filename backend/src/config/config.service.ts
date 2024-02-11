import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private settings: Map<string, any> = new Map<string, any>();

  constructor() {
    const envOutput = dotenv.config().parsed;
    for (const key in envOutput) {
      if (['true', 'false'].includes(envOutput[key])) {
        this.settings.set(key, envOutput[key] === 'true');
        continue;
      }
      if (
        !isNaN(parseInt(envOutput[key])) &&
        parseInt(envOutput[key]).toString() === envOutput[key]
      ) {
        this.settings.set(key, parseInt(envOutput[key]));
        continue;
      }
      this.settings.set(key, envOutput[key]);
    }
  }

  public get<T>(key: string): T {
    const found = this.settings.get(key);
    if (found) {
      return found;
    }

    // loading from process.env
    const processEnv = process.env[key];
    if (processEnv) {
      const processEnvInt = parseInt(processEnv)
      if (!isNaN(processEnvInt) && processEnvInt.toString() === processEnv) {
        return processEnvInt as T;
      }
      if (['true', 'false'].includes(processEnv)) {
        return (processEnv === 'true') as T;
      }
      return processEnv as T;
    }
    return null;
  }

  public set(key: string, value: any): void {
    this.settings.set(key, value);
  }
}
