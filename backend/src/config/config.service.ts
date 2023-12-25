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
      this.settings.set(key, envOutput[key]);
    }
  }

  public get<T>(key: string): T {
    return this.settings.get(key);
  }

  public set(key: string, value: any): void {
    this.settings.set(key, value);
  }
}
