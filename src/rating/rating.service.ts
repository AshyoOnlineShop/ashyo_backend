import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating) private RatingRepository: typeof Rating) {}

  async create(createRatingDto: CreateRatingDto) {
    const comment = await this.RatingRepository.create(createRatingDto);
    return comment;
  }

  async findAll() {
    const cart = await this.RatingRepository.findAll({
      include: { all: true },
    });
    return cart;
  }

  async findOne(id: number) {
    const cart = await this.RatingRepository.findOne({ where: { id } });
    return cart;
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const cart = await this.RatingRepository.update(updateRatingDto, {
      where: { id },
    });
    return cart;
  }

  async remove(id: number) {
    const cart = await this.RatingRepository.destroy({ where: { id } });
    return cart;
  }
}
