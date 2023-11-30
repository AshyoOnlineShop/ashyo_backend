import { Injectable } from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { ProductInfo } from './model/product-info.model';

@Injectable()
export class ProductInfoService {
  async create(createProductInfo: CreateProductInfoDto) {
    return await ProductInfo.create(createProductInfo);
  }

  async findAll() {
    return ProductInfo.findAll({
      include: { all: true },
    });
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
