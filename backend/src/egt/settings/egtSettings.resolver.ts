import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql';
import { EGTCategorySettings, EGTSettings } from './egtSettings.entity';
import {
  BadRequestException,
  Inject,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { EGTSettingsGuard } from './egtSettings.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { ROLES } from 'src/auth/types';
import { EGTSettingsService } from './egtSettings.service';
import {
  EGTCategorySettingsInput,
  EGTSettingsInput,
} from './egtSettings.types';
import { SEX } from 'src/base/starter/starter.types';
import { CompetitionService } from 'src/base/competition/competition.service';

@Resolver(EGTSettings)
@UseGuards(EGTSettingsGuard, RoleGuard)
export class EGTSettingsResolver {
  @Inject()
  private readonly egtSettingsService: EGTSettingsService;

  @Inject()
  private readonly competitionService: CompetitionService;

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTSettings, { name: 'egtSettings' })
  async upsert(
    @Args('competitionID', { type: () => ID, nullable: true })
    competitionID: number,
    @Args('data', { type: () => EGTSettingsInput }) data: EGTSettingsInput,
  ): Promise<EGTSettings> {
    if (data.id && competitionID) {
      throw new BadRequestException();
    }

    let settings = new EGTSettings();
    if (data.id) {
      const settings = await this.egtSettingsService.findOne(data.id);
      if (!settings) {
        throw new NotFoundException();
      }
    } else {
      const competition = await this.competitionService.findOne(competitionID);
      if (!competition) {
        throw new NotFoundException();
      }

      settings.competition = Promise.resolve(competition);
    }

    settings.categorySettings = data.categorySettings;

    return await this.egtSettingsService.save(settings);
  }

  @Role(ROLES.VIEWER)
  @Query(() => EGTSettings, { name: 'egtSettings' })
  async get(@Args('competitionID', { type: () => ID }) competitionID: number) {
    return await this.egtSettingsService.findOneByCompetitionID(competitionID);
  }

  @Role(ROLES.VIEWER)
  @Query(() => EGTCategorySettings, { name: 'egtCategorySettings' })
  async getEGTCategorySettings(
    @Args('competitionID', { type: () => ID }) competitionID: number,
    @Args('category') category: number,
    @Args('sex', { type: () => SEX }) sex: SEX,
  ) {
    const categorySettings =
      await this.egtSettingsService.getCategorySettingsByCompetitionID(
        competitionID,
        category,
        sex,
      );

    if (!categorySettings) {
      throw new NotFoundException();
    }

    return categorySettings;
  }

  @Role(ROLES.ADMIN)
  @Mutation(() => EGTCategorySettings, { name: 'egtCategorySettings' })
  async updateEGTCategorySettings(
    @Args('competitionID', { type: () => ID }) competitionID: number,
    @Args('data', { type: () => EGTCategorySettingsInput })
    data: EGTCategorySettingsInput,
  ) {
    const settings = await this.egtSettingsService.findOneByCompetitionID(
      competitionID,
    );
    if (!settings) {
      throw new NotFoundException();
    }

    const categorySettingsIndex = settings.categorySettings.findIndex(
      (categorySetting) =>
        categorySetting.category === data.category &&
        categorySetting.sex === data.sex,
    );
    if (categorySettingsIndex < 0) {
      throw new NotFoundException();
    }
    settings.categorySettings[categorySettingsIndex] = data;
    await this.egtSettingsService.save(settings);
    return data;
  }
}
