import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTCategorySettings, EGTSettings } from './egtSettings.entity';
import { Repository } from 'typeorm';
import { SEX } from 'src/base/starter/starter.types';

@Injectable()
export class EGTSettingsService {
  @InjectRepository(EGTSettings)
  private readonly egtSettingsRepository: Repository<EGTSettings>;

  async findOne(id: number): Promise<EGTSettings> {
    return this.egtSettingsRepository.findOneBy({ id });
  }

  async findOneByCompetitionID(competitionID: number): Promise<EGTSettings> {
    return this.egtSettingsRepository.findOneBy({
      competition: { id: competitionID },
    });
  }

  save(settings: EGTSettings): Promise<EGTSettings> {
    for (const category of settings.categorySettings) {
      if (category.honourPrecentage > 100 || category.honourPrecentage < 0) {
        throw new BadRequestException();
      }
    }

    return this.egtSettingsRepository.save(settings);
  }

  async getCategorySettingsByCompetitionID(
    competitionID: number,
    category: number,
    sex: SEX,
  ): Promise<EGTCategorySettings | null> {
    const settings = await this.findOneByCompetitionID(competitionID);
    if (!settings) {
      return null;
    }
    return settings.categorySettings.find(
      (s) => s.category === category && s.sex == sex,
    );
  }

  async getCategorySettings(
    id: number,
    category: number,
    sex: SEX,
  ): Promise<EGTCategorySettings | null> {
    const settings = await this.egtSettingsRepository.findOneBy({ id });
    if (!settings) {
      return null;
    }
    return settings.categorySettings.find(
      (s) => s.category === category && s.sex == sex,
    );
  }
}
