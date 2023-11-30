import { Injectable } from '@nestjs/common';
import { CreateAboutShopDto } from './dto/create-about_shop.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AboutShop } from './models/about_shop.model';
import { UpdateAboutShopDto } from './dto/update-about_shop.dto';

@Injectable()
export class AboutShopService {
  constructor(
    @InjectModel(AboutShop)
    private aboutShopRepo: typeof AboutShop,
  ) {}

  async createAboutShop(
    createAboutShopDto: CreateAboutShopDto,
  ): Promise<AboutShop> {
    const aboutShop = await this.aboutShopRepo.create(createAboutShopDto);
    return aboutShop;
  }

  async getAllAboutShops(): Promise<AboutShop[]> {
    const aboutShop = await this.aboutShopRepo.findAll({
      include: { all: true },
    });
    return aboutShop;
  }

  async getAboutShopById(id: number): Promise<AboutShop> {
    const aboutShop = await this.aboutShopRepo.findOne({
      where: { id },
      include: { all: true }
    });
    return aboutShop;
  }

  async deleteAboutShopById(id: number): Promise<number> {
    return this.aboutShopRepo.destroy({ where: { id } });
  }

  async updateAboutShop(
    id: number,
    updateAboutShopDto: UpdateAboutShopDto,
  ): Promise<AboutShop> {
    const aboutShop = await this.aboutShopRepo.update(updateAboutShopDto, {
      where: { id },
      returning: true,
    });
    console.log(aboutShop);

    return aboutShop[1][0].dataValues;
  }
}
