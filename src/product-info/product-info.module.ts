import { Module } from '@nestjs/common';
import { ProductInfoService } from './product-info.service';
import { ProductInfoController } from './product-info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductInfo } from './model/product-info.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductInfo])],
  controllers: [ProductInfoController],
  providers: [ProductInfoService],
})
export class ProductInfoModule {}
