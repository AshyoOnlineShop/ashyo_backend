import { ViewedProduct } from './models/viewed_product.model';
import { Injectable } from '@nestjs/common';
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

  async findAll() {
    const data = await this.ViewedProductRepository.findAll({
      include: { all: true },
    });

    return data;
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
