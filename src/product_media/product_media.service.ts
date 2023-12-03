import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductMedia } from './models/product_media.model';
import { UpdateProductMediaDto } from './dto/update-product_media.dto';
import { FilesService } from '../file_uploads/file_uploads.service';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectModel(ProductMedia)
    private product_mediaRepo: typeof ProductMedia,
    private filesService: FilesService,
  ) {}

  async createProductMedia(
    createProductMediaDto: CreateProductMediaDto,
    url: any,
  ) {
    try {
      const fileName = await this.filesService.createFile(url);
      const product_media = await this.product_mediaRepo.create({
        ...createProductMediaDto,
        url: fileName,
      });

      return { message: 'Created successfully', product_media };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
    url: any,
  ) {
    const media = await this.product_mediaRepo.findByPk(id);
    if (!media) {
      throw new NotFoundException('Media not found with such id');
    }
    const fileName = await this.filesService.createFile(url);
    const product_media = await this.product_mediaRepo.update(
      { ...updateProductMediaDto, url: fileName },
      {
        where: { id },
        returning: true,
      },
    );
    if (!product_media[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return product_media[1][0].dataValues;
  }
}
