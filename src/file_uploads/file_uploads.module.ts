import { Module } from '@nestjs/common';
import { FilesService } from './file_uploads.service';

@Module({
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
