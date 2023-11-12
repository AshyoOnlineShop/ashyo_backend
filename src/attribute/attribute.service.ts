import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './model/attribute.model';

@Injectable()
export class AttributeService {
  async create(createAttributeDto: CreateAttributeDto) {
    return await Attribute.create(createAttributeDto);
  }

  async findAll() {
    return Attribute.findAll();
  }

  async findOne(id: number) {
    return await Attribute.findOne({ where: { id } });
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return await Attribute.update(updateAttributeDto, { where: { id } });
  }

  async remove(id: number) {
    return await Attribute.destroy({ where: { id } });
  }
}
