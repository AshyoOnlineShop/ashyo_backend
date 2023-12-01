import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  private readonly allowedFileTypes = ['jpg', 'jpeg', 'png'];

  async createFile(file: any): Promise<string> {
    this.validateFileType(file);

    try {
      const fileName = this.generateFileName(file);
      const filePath = this.getUploadsPath();

      this.createUploadsDirectory(filePath);

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      const fullUrl = this.generateFullUrl(fileName);

      return fullUrl;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private validateFileType(file: any): void {
    if (!this.allowedFileTypes.includes(file.mimetype.split('/')[1])) {
      throw new BadRequestException('File with such type not allowed');
    }
  }

  private generateFileName(file: any): string {
    return uuid.v4() + `.${file.mimetype.split('/')[1]}`;
  }

  private getUploadsPath(): string {
    return path.resolve(__dirname, '../../', 'uploads');
  }

  private createUploadsDirectory(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
  }

  private generateFullUrl(fileName: string): string {
    const baseUri = process.env.BASE_URI;
    return `${baseUri}${fileName}`;
  }
}
