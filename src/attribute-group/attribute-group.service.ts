import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttributeGroupDto } from './dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute-group.dto';
import { AttributeGroup } from './model/attribute-group.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AttributeGroupService {
  constructor(
    @InjectModel(AttributeGroup)
    private attributeGroupRepo: typeof AttributeGroup,
  ) {}

  async create(createAttributeDto: CreateAttributeGroupDto) {
    return await AttributeGroup.create(createAttributeDto);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ attr_groups: AttributeGroup[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const attr_groups = await this.attributeGroupRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.attributeGroupRepo.count();
      return { attr_groups, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    return await AttributeGroup.findOne({
      where: { id },
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
