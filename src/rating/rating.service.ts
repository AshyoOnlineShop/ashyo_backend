import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ ratings: Rating[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const ratings = await this.RatingRepository.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.RatingRepository.count();
      return { ratings, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    const cart = await this.RatingRepository.findOne({
      where: { id },
      include: { all: true },
    });
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
