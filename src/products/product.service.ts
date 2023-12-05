import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesService } from '../file_uploads/file_uploads.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productRepo: typeof Product,
    private filesService: FilesService,
  ) {}

  // async createProduct(createProductDto: CreateProductDto): Promise<Product> {
  //   const product = await this.productRepo.create(createProductDto);
  //   return product;
  // }

  async createProduct(createProductDto: CreateProductDto, image: any) {
    try {
      const existingProduct = await this.productRepo.findOne({
        where: { model_id: createProductDto.model_id },
      });

      if (existingProduct) {
        throw new BadRequestException(
          'Product with the same model_id already exists',
        );
      }

      const fileName = await this.filesService.createFile(image);
      const product = await this.productRepo.create({
        ...createProductDto,
        image: fileName,
      });

      return { message: 'Created successfully', product };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllProducts(
    page: number,
    limit: number,
  ): Promise<{ products: Product[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const products = await this.productRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.productRepo.count();
      return { products, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return product;
  }

  async deleteProductById(id: number): Promise<number> {
    return this.productRepo.destroy({ where: { id } });
  }

  // async updateProduct(
  //   id: number,
  //   updateProductDto: UpdateProductDto,
  // ): Promise<Product> {
  //   const product = await this.productRepo.update(updateProductDto, {
  //     where: { id },
  //     returning: true,
  //   });
  //   console.log(product);

  //   return product[1][0].dataValues;
  // }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    image: any,
  ) {
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException('category not found with such id');
    }
    const fileName = await this.filesService.createFile(image);
    const updated = await this.productRepo.update(
      { ...updateProductDto, image: fileName },
      {
        where: { id },
        returning: true,
      },
    );
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return updated[1][0].dataValues;
  }
}
