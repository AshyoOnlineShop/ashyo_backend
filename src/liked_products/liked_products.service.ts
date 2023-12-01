import { LikedProduct } from './models/liked_product.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikedProductDto } from './dto/create-liked_product.dto';
import { UpdateLikedProductDto } from './dto/update-liked_product.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LikedProductsService {
  constructor(
    @InjectModel(LikedProduct)
    private LikedProductRepository: typeof LikedProduct,
  ) {}
  async create(createLikedProductDto: CreateLikedProductDto) {
    const liked = await this.LikedProductRepository.create(
      createLikedProductDto,
    );
    return liked;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ liked_products: LikedProduct[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const liked_products = await this.LikedProductRepository.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.LikedProductRepository.count();
      return { liked_products, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    const liked = await this.LikedProductRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return liked;
  }

  async update(id: number, updateLikedProductDto: UpdateLikedProductDto) {
    const liked = await this.LikedProductRepository.update(
      updateLikedProductDto,
      { where: { id } },
    );
    return liked;
  }

  async remove(id: number) {
    const liked = await this.LikedProductRepository.destroy({ where: { id } });
    return liked;
  }
}
