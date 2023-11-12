import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category.model';

@Injectable()
export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto) {
    return await Category.create(createCategoryDto);
  }

  async findAll() {
    return Category.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await Category.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await Category.update(updateCategoryDto, { where: { id } });
  }

  async remove(id: number) {
    return await Category.destroy({ where: { id } });
  }
}
