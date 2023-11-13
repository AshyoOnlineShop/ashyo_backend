import { Module } from '@nestjs/common';
import { ProductMediaService } from './product_media.service';
import { ProductMediaController } from './product_media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductMedia } from './models/product_media.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductMedia])],
  controllers: [ProductMediaController],
  providers: [ProductMediaService],
})
export class ProductMediaModule {}
