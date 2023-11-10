import { Module } from '@nestjs/common';
import { AboutShopService } from './about_shop.service';
import { AboutShopController } from './about_shop.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutShop } from './models/about_shop.model';

@Module({
  imports: [SequelizeModule.forFeature([AboutShop])],
  controllers: [AboutShopController],
  providers: [AboutShopService],
})
export class AboutShopModule {}
