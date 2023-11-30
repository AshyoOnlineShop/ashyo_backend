import { Injectable } from '@nestjs/common';
import { CreateAttributeGroupDto } from './dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute-group.dto';
import { AttributeGroup } from './model/attribute-group.model';

@Injectable()
export class AttributeGroupService {
  async create(createAttributeDto: CreateAttributeGroupDto) {
    return await AttributeGroup.create(createAttributeDto);
  }

  async findAll() {
    return AttributeGroup.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await AttributeGroup.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async getAllByCategoryId(category_id: number) {
    return await AttributeGroup.findAll({
      where: { category_id: category_id },
      include: { all: true },
    });
  }

  async update(id: number, updateAttributeDto: UpdateAttributeGroupDto) {
    return await AttributeGroup.update(updateAttributeDto, { where: { id } });
  }

  async remove(id: number) {
    return await AttributeGroup.destroy({ where: { id } });
  }
}
