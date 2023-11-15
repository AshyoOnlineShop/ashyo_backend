import { LikedProduct } from './models/liked_product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { LikedProductsService } from './liked_products.service';
import { LikedProductsController } from './liked_products.controller';

@Module({
  imports: [SequelizeModule.forFeature([LikedProduct])],
  controllers: [LikedProductsController],
  providers: [LikedProductsService],
})
export class LikedProductsModule {}
