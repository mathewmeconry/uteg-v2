import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import FileService from './services/file.service.js';

@Module({
  imports: [ConfigModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
