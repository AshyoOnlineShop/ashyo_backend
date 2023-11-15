import { LikedProduct } from './models/liked_product.model';
import { Injectable } from '@nestjs/common';
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

  async findAll() {
    const cart = await this.LikedProductRepository.findAll({
      include: { all: true },
    });
    return cart;
  }

  async findOne(id: number) {
    const cart = await this.LikedProductRepository.findOne({ where: { id } });

    return cart;
  }

  async update(id: number, updateLikedProductDto: UpdateLikedProductDto) {
    const cart = await this.LikedProductRepository.update(
      updateLikedProductDto,
      { where: { id } },
    );
    return cart;
  }

  async remove(id: number) {
    const cart = await this.LikedProductRepository.destroy({ where: { id } });
    return cart;
  }
}
