import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { ProductInfo } from './model/product-info.model';

@Injectable()
export class ProductInfoService {
  async create(createProductInfo: CreateProductInfoDto) {
    return await ProductInfo.create(createProductInfo);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ product_infos: ProductInfo[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const product_infos = await ProductInfo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await ProductInfo.count();
      return { product_infos, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    return await ProductInfo.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateProductInfoDto: UpdateProductInfoDto) {
    return await ProductInfo.update(updateProductInfoDto, { where: { id } });
  }

  async remove(id: number) {
    return await ProductInfo.destroy({ where: { id } });
  }
}
