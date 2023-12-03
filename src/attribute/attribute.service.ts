import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './model/attribute.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AttributeService {
  constructor(
    @InjectModel(Attribute)
    private attributeRepo: typeof Attribute,
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    return await this.attributeRepo.create(createAttributeDto);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ attributes: Attribute[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const attributes = await this.attributeRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.attributeRepo.count();
      return { attributes, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    return await Attribute.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return await Attribute.update(updateAttributeDto, { where: { id } });
  }

  async remove(id: number) {
    return await Attribute.destroy({ where: { id } });
  }
}
