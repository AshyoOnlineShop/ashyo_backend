import { Module } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { SaleProductsController } from './sale-products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SaleProducts } from './model/sale-product.model';

@Module({
  imports: [SequelizeModule.forFeature([SaleProducts])],
  controllers: [SaleProductsController],
  providers: [SaleProductsService],
})
export class SaleProductsModule {}
