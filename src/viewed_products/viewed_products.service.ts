import { ViewedProduct } from './models/viewed_product.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateViewedProductDto } from './dto/create-viewed_product.dto';
import { UpdateViewedProductDto } from './dto/update-viewed_product.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ViewedProductsService {
  constructor(
    @InjectModel(ViewedProduct)
    private ViewedProductRepository: typeof ViewedProduct,
  ) {}

  async create(createViewedProductDto: CreateViewedProductDto) {
    const data = await this.ViewedProductRepository.create(
      createViewedProductDto,
    );

    return data;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ viewed_products: ViewedProduct[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const viewed_products = await this.ViewedProductRepository.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.ViewedProductRepository.count();
      return { viewed_products, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    const data = await this.ViewedProductRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return data;
  }

  async update(id: number, updateViewedProductDto: UpdateViewedProductDto) {
    const data = await this.ViewedProductRepository.update(
      updateViewedProductDto,
      { where: { id } },
    );

    return data;
  }

  async remove(id: number) {
    const data = await this.ViewedProductRepository.destroy({ where: { id } });

    return data;
  }
}
