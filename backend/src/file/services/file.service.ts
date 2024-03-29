import { Inject, Injectable } from '@nestjs/common';
import { FileUpload, ReadStream } from 'graphql-upload-ts';
import { ConfigService } from 'src/config/config.service';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';
import { parse } from 'svg-parser';

type FileTypeResult = {
  readonly ext: string;
  readonly mime: string;
};

@Injectable()
export default class FileService {
  @Inject()
  private readonly configService: ConfigService;

  public async saveFile(
    fileUpload: FileUpload,
    allowedMimeTypes: string[],
  ): Promise<string> {
    const tmpFile = await this.makeTempFile(fileUpload.createReadStream());
    if (!(await this.checkMemeType(tmpFile, allowedMimeTypes))) {
      await fs.rm(path.dirname(tmpFile), { recursive: true, force: true });
      throw new Error('Invalid file type');
    }
    const fileExtension = await this.getFileExtension(tmpFile);
    const filename = `${randomUUID()}.${fileExtension}`;
    const storagePath = path.join(
      this.configService.get('PERSISTENT_STORAGE_PATH'),
      filename,
    );
    await fs.cp(tmpFile, storagePath);
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true });
    return storagePath;
  }

  public async deleteFile(filePath: string): Promise<boolean> {
    try {
      await fs.rm(filePath);
      return true;
    } catch {
      return false;
    }
  }

  public async checkMemeType(
    file: string,
    allowedMimeTypes: string[],
  ): Promise<boolean> {
    const { fileTypeFromFile } = await import('file-type');
    const filetype = await fileTypeFromFile(file);
    // iterative regex match till the first hit
    for (const allowed of allowedMimeTypes) {
      const matches = filetype.mime.match(allowed);
      if (matches && matches.length > 0) {
        return true;
      }
    }

    // special case for svg files
    if (allowedMimeTypes.includes('image/svg+xml')) {
      const result = await this.detectSvg(file);
      if (result.mime === 'image/svg+xml') {
        return true;
      }
    }

    return false;
  }

  public async getFileExtension(file: string): Promise<string> {
    const { fileTypeFromFile } = await import('file-type');
    const filetype = await fileTypeFromFile(file);
    if (filetype.mime === 'application/xml') {
      return this.detectSvg(file).then((result) => result.ext);
    }

    return filetype?.ext || 'txt';
  }

  public async makeTempFile(file: ReadStream): Promise<string> {
    const tmp = await fs.mkdtemp(
      path.join(os.tmpdir(), `uteg-${randomUUID()}`),
    );
    const storagePath = path.join(tmp, `${randomUUID()}.tmp`);
    await fs.writeFile(storagePath, file);
    return storagePath;
  }

  public async detectSvg(file: string): Promise<FileTypeResult> {
    try {
      const fileContent = await fs.readFile(file);
      parse(fileContent.toString());

      return {
        ext: 'svg',
        mime: 'image/svg+xml',
      };
    } catch {
      return {
        ext: 'txt',
        mime: 'text/plain',
      };
    }
  }
}
