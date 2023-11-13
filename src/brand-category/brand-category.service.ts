import { Injectable } from '@nestjs/common';
import { CreateBrandCategoryDto } from './dto/create-brand-category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand-category.dto';
import { BrandCategory} from './model/brand-category.model';

@Injectable()
export class BrandCategoryService {
  async create(createBrandCategoryDto: CreateBrandCategoryDto) {
    return await BrandCategory.create(createBrandCategoryDto);
  }

  async findAll() {
    return BrandCategory.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await BrandCategory.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateBrandCategoryDto: UpdateBrandCategoryDto) {
    return await BrandCategory.update(updateBrandCategoryDto, { where: { id } });
  }

  async remove(id: number) {
    return await BrandCategory.destroy({ where: { id } });
  }
}
