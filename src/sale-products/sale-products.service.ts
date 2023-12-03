import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { SaleProducts } from './model/sale-product.model';

@Injectable()
export class SaleProductsService {
  async create(createBrandCategoryDto: CreateSaleProductDto) {
    return await SaleProducts.create(createBrandCategoryDto);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ sale_products: SaleProducts[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const sale_products = await SaleProducts.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await SaleProducts.count();
      return { sale_products, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
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
