import { Module } from '@nestjs/common';
import { ProductMediaService } from './product_media.service';
import { ProductMediaController } from './product_media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductMedia } from './models/product_media.model';
import { FilesModule } from '../file_uploads/file_uploads.module';

@Module({
  imports: [SequelizeModule.forFeature([ProductMedia]), FilesModule],
  controllers: [ProductMediaController],
  providers: [ProductMediaService],
})
export class ProductMediaModule {}
