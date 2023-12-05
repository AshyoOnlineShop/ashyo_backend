import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FilesModule } from '../file_uploads/file_uploads.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), FilesModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
