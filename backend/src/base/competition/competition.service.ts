import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/auth/user/user.service';
import { User } from 'src/auth/user/user.entity';
import { ROLES } from 'src/auth/types';
import { ModuleService } from '../modules/module.service';
import { FileUpload } from 'graphql-upload-ts';
import { ConfigService } from 'src/config/config.service';
import FileService from 'src/file/services/file.service';

@Injectable()
export class CompetitionService {
  @InjectRepository(Competition)
  private competitionRepository: Repository<Competition>;

  @Inject()
  private userService: UserService;

  @Inject()
  private moduleService: ModuleService;

  @Inject()
  private configService: ConfigService;

  @Inject()
  private fileService: FileService;

  async create(competition: Competition, user: User): Promise<Competition> {
    competition = await this.competitionRepository.save(competition);
    await this.userService.link(user, competition, ROLES.ADMIN);
    await this.moduleService.initCompetition(competition);
    return competition;
  }

  async save(competition: Competition): Promise<Competition> {
    return this.competitionRepository.save(competition);
  }

  async saveLogoFile(fileUpload: FileUpload): Promise<string> {
    return this.fileService.saveFile(
      fileUpload,
      this.configService.get<string>('ALLOWED_LOGO_MIME_TYPES').split(','),
    );
  }

  async deleteLogo(competition: Competition): Promise<Competition> {
    await this.fileService.deleteFile(competition.logoPath);
    return { ...competition, logoPath: '' };
  }

  findAll(): Promise<Competition[]> {
    return this.competitionRepository.find();
  }

  findOne(id: number): Promise<Competition | null> {
    return this.competitionRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.competitionRepository.delete(id);
  }
}
