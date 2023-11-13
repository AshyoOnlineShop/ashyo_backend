import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productRepo: typeof Product,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepo.create(createProductDto);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const product = await this.productRepo.findAll({
      include: { all: true },
    });
    return product;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    return product;
  }

  async deleteProductById(id: number): Promise<number> {
    return this.productRepo.destroy({ where: { id } });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepo.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    console.log(product);

    return product[1][0].dataValues;
  }
}
