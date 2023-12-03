import { Module } from '@nestjs/common';
import { BrandService } from './brands.service';
import { BrandController } from './brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './models/brands.model';
import { FilesModule } from '../file_uploads/file_uploads.module';

@Module({
  imports: [SequelizeModule.forFeature([Brand]), FilesModule],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
