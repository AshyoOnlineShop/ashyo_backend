import { Injectable } from '@nestjs/common';
import { CreateProductBranchDto } from './dto/create-product_branch.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductBranch } from './models/product_branch.model';
import { UpdateProductBranchDto } from './dto/update-product_branch.dto';

@Injectable()
export class ProductBranchesService {
  constructor(
    @InjectModel(ProductBranch)
    private productBranchRepo: typeof ProductBranch,
  ) {}

  async createProductBranch(createProductBranchDto: CreateProductBranchDto): Promise<ProductBranch> {
    const productBranch = await this.productBranchRepo.create(createProductBranchDto);
    return productBranch;
  }

  async getAllProductBranchs(): Promise<ProductBranch[]> {
    const productBranch = await this.productBranchRepo.findAll({ include: { all: true } });
    return productBranch;
  }

  async getProductBranchById(id: number): Promise<ProductBranch> {
    const productBranch = await this.productBranchRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return productBranch;
  }

  async deleteProductBranchById(id: number): Promise<number> {
    return this.productBranchRepo.destroy({ where: { id } });
  }

  async updateProductBranch(
    id: number,
    updateProductBranchDto: UpdateProductBranchDto,
  ): Promise<ProductBranch> {
    const productBranch = await this.productBranchRepo.update(updateProductBranchDto, {
      where: { id },
      returning: true,
    });

    return productBranch[1][0].dataValues;
  }
}
