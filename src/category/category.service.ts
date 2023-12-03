import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category.model';
import { FilesService } from '../file_uploads/file_uploads.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryRepo: typeof Category,
    private filesService: FilesService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, image: any) {
    try {
      const fileName = await this.filesService.createFile(image);
      const category = await this.categoryRepo.create({
        ...createCategoryDto,
        image: fileName,
      });

      return { message: 'Created successfully', category };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ categories: Category[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const categories = await this.categoryRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.categoryRepo.count();
      return { categories, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    return await Category.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image: any) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new NotFoundException('category not found with such id');
    }
    const fileName = await this.filesService.createFile(image);
    const updated = await this.categoryRepo.update(
      { ...updateCategoryDto, image: fileName },
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

  async remove(id: number) {
    return await Category.destroy({ where: { id } });
  }
}
