import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCard_typesDto } from './dto/create-card_types.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card_types } from './models/card_types.model';
import { UpdateCard_typesDto } from './dto/update-card_types.dto';
import { FilesService } from '../file_uploads/file_uploads.service';

@Injectable()
export class Card_typesService {
  constructor(
    @InjectModel(Card_types)
    private card_typesRepo: typeof Card_types,
    private filesService: FilesService,
  ) {}

  async createCard_types(createCard_typesDto: CreateCard_typesDto, image: any) {
    try {
      const fileName = await this.filesService.createFile(image);
      const type = await this.card_typesRepo.create({
        ...createCard_typesDto,
        image: fileName,
      });

      return { message: 'Created successfully', type };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
    image: any,
  ) {
    const type = await this.card_typesRepo.findByPk(id);
    if (!type) {
      throw new NotFoundException('type not found with such id');
    }
    const fileName = await this.filesService.createFile(image);
    const updated = await this.card_typesRepo.update(
      { ...updateCard_typesDto, image: fileName },
      {
        where: { id },
        returning: true,
      },
    );
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return updated[1][0].dataValues;
  }
}
