import { ViewedProduct } from './models/viewed_product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ViewedProductsService } from './viewed_products.service';
import { ViewedProductsController } from './viewed_products.controller';

@Module({
  imports: [SequelizeModule.forFeature([ViewedProduct])],
  controllers: [ViewedProductsController],
  providers: [ViewedProductsService],
})
export class ViewedProductsModule {}
