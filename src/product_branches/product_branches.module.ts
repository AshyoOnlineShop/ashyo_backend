import { Module } from '@nestjs/common';
import { ProductBranchesService } from './product_branches.service';
import { ProductBranchesController } from './product_branches.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductBranch } from './models/product_branch.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductBranch])],
  controllers: [ProductBranchesController],
  providers: [ProductBranchesService],
})
export class ProductBranchesModule {}
