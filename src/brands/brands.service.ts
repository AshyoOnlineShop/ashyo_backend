import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brands.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './models/brands.model';
import { UpdateBrandDto } from './dto/update-brands.dto';
import { FilesService } from '../file_uploads/file_uploads.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand)
    private brandRepo: typeof Brand,
    private filesService: FilesService,
  ) {}

  async createBrand(createBrandDto: CreateBrandDto, image: any) {
    try {
      const fileName = await this.filesService.createFile(image);
      const brand = await this.brandRepo.create({
        ...createBrandDto,
        image: fileName,
      });

      if (!brand) {
        throw new BadRequestException('Error in creating brand');
      }

      return { message: 'Created successfully', brand };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // async getAllBrands(): Promise<Brand[]> {
  //   const brand = await this.brandRepo.findAll({
  //     include: { all: true },
  //   });
  //   return brand;
  // }
  async getAllBrands(
    page: number,
    limit: number,
  ): Promise<{ brands: Brand[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const brands = await this.brandRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.brandRepo.count();
      return { brands, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getBrandById(id: number): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return brand;
  }

  async deleteBrandById(id: number): Promise<number> {
    return this.brandRepo.destroy({ where: { id } });
  }

  async update(id: number, updatebrandDto: UpdateBrandDto, image: any) {
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    const fileName = await this.filesService.createFile(image);
    const updated = await this.brandRepo.update(
      { ...updatebrandDto, image: fileName },
      {
        where: { id },
        returning: true,
      },
    );
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return {
      message: 'Updated successfully',
      brand: updated[1][0].dataValues,
    };
  }
}
