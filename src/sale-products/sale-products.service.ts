import { Injectable } from '@nestjs/common';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { SaleProducts } from './model/sale-product.model';

@Injectable()
export class SaleProductsService {
  async create(createBrandCategoryDto: CreateSaleProductDto) {
    return await SaleProducts.create(createBrandCategoryDto);
  }

  async findAll() {
    return SaleProducts.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await SaleProducts.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateBrandCategoryDto: UpdateSaleProductDto) {
    return await SaleProducts.update(updateBrandCategoryDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    return await SaleProducts.destroy({ where: { id } });
  }
}
