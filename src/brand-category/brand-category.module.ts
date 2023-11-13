import { Module } from '@nestjs/common';
import { BrandCategoryService } from './brand-category.service';
import { BrandCategoryController } from './brand-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BrandCategory } from './model/brand-category.model';

@Module({
  imports: [SequelizeModule.forFeature([BrandCategory])],
  controllers: [BrandCategoryController],
  providers: [BrandCategoryService],
})
export class BrandCategoryModule {}
