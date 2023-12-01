import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getAllProductModels(
    page: number,
    limit: number,
  ): Promise<{ product_models: ProductModel[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const product_models = await this.product_modelRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.product_modelRepo.count();
      return { product_models, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
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
