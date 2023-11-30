import { Injectable } from '@nestjs/common';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductMedia } from './models/product_media.model';
import { UpdateProductMediaDto } from './dto/update-product_media.dto';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectModel(ProductMedia)
    private product_mediaRepo: typeof ProductMedia,
  ) {}

  async createProductMedia(
    createProductMediaDto: CreateProductMediaDto,
  ): Promise<ProductMedia> {
    const product_media = await this.product_mediaRepo.create(
      createProductMediaDto,
    );
    return product_media;
  }

  async getAllProductMedias(): Promise<ProductMedia[]> {
    const product_media = await this.product_mediaRepo.findAll({
      include: { all: true },
    });
    return product_media;
  }

  async getProductMediaById(id: number): Promise<ProductMedia> {
    const product_media = await this.product_mediaRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return product_media;
  }

  async deleteProductMediaById(id: number): Promise<number> {
    return this.product_mediaRepo.destroy({ where: { id } });
  }

  async updateProductMedia(
    id: number,
    updateProductMediaDto: UpdateProductMediaDto,
  ): Promise<ProductMedia> {
    const product_media = await this.product_mediaRepo.update(
      updateProductMediaDto,
      {
        where: { id },
        returning: true,
      },
    );
    console.log(product_media);

    return product_media[1][0].dataValues;
  }
}
