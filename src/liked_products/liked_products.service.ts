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
    const liked = await this.LikedProductRepository.findAll({
      include: { all: true },
    });
    return liked;
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
