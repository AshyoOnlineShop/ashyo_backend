import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCard_typesDto } from './dto/create-card_types.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card_types } from './models/card_types.model';
import { UpdateCard_typesDto } from './dto/update-card_types.dto';

@Injectable()
export class Card_typesService {
  constructor(
    @InjectModel(Card_types)
    private card_typesRepo: typeof Card_types,
  ) {}

  async createCard_types(
    createCard_typesDto: CreateCard_typesDto,
  ): Promise<Card_types> {
    const card_types = await this.card_typesRepo.create(createCard_typesDto);
    return card_types;
  }

  async getAllCard_typess(): Promise<Card_types[]> {
    const card_types = await this.card_typesRepo.findAll({
      include: { all: true },
    });
    return card_types;
  }

  async getCard_typesById(id: number): Promise<Card_types> {
    const card_types = await this.card_typesRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return card_types;
  }

  async getCard_typesByName(name: string): Promise<Card_types> {
    console.log(name);
    const card_types = await this.card_typesRepo.findOne({
      where: { name },
      include: { all: true },
    });
    return card_types;
  }

  async deleteCard_typesById(id: number): Promise<number> {
    return this.card_typesRepo.destroy({ where: { id } });
  }

  async updateCard_types(
    id: number,
    updateCard_typesDto: UpdateCard_typesDto,
  ): Promise<Card_types> {
    const card_types = await this.card_typesRepo.update(updateCard_typesDto, {
      where: { id },
      returning: true,
    });

    if (!card_types[1].length) {
      throw new NotFoundException(`Card_types with ID "${id}" not found`);
    }

    return card_types[1][0].dataValues;
  }
}
