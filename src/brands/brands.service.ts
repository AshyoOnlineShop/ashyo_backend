import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brands.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './models/brands.model';
import { UpdateBrandDto } from './dto/update-brands.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand)
    private brandRepo: typeof Brand,
  ) {}

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = await this.brandRepo.create(createBrandDto);
    return brand;
  }

  async getAllBrands(): Promise<Brand[]> {
    const brand = await this.brandRepo.findAll({
      include: { all: true },
    });
    return brand;
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

  async updateBrand(
    id: number,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    const brand = await this.brandRepo.update(updateBrandDto, {
      where: { id },
      returning: true,
    });
    console.log(brand);

    return brand[1][0].dataValues;
  }
}
