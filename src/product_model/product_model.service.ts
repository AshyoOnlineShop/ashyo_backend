import { Injectable } from '@nestjs/common';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './models/product_model.model';
import { UpdateProductModelDto } from './dto/update-product_model.dto';

@Injectable()
export class ProductModelService {
  constructor(
    @InjectModel(ProductModel)
    private product_modelRepo: typeof ProductModel,
  ) {}

  async createProductModel(
    createProductModelDto: CreateProductModelDto,
  ): Promise<ProductModel> {
    const product_model = await this.product_modelRepo.create(
      createProductModelDto,
    );
    return product_model;
  }

  async getAllProductModels(): Promise<ProductModel[]> {
    const product_model = await this.product_modelRepo.findAll({
      include: { all: true },
    });
    return product_model;
  }

  async getProductModelById(id: number): Promise<ProductModel> {
    const product_model = await this.product_modelRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return product_model;
  }

  async deleteProductModelById(id: number): Promise<number> {
    return this.product_modelRepo.destroy({ where: { id } });
  }

  async updateProductModel(
    id: number,
    updateProductModelDto: UpdateProductModelDto,
  ): Promise<ProductModel> {
    const product_model = await this.product_modelRepo.update(
      updateProductModelDto,
      {
        where: { id },
        returning: true,
      },
    );
    console.log(product_model);

    return product_model[1][0].dataValues;
  }
}
