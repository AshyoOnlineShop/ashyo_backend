import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District)
    private districtRepo: typeof District,
  ) {}

  async createDistrict(
    createDistrictDto: CreateDistrictDto,
  ): Promise<District> {
    const district = await this.districtRepo.create(createDistrictDto);
    return district;
  }

  async getAllDistricts(
    page: number,
    limit: number,
  ): Promise<{ districts: District[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const districts = await this.districtRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.districtRepo.count();
      return { districts, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getDistrictById(id: number): Promise<District> {
    const district = await this.districtRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return district;
  }

  async deleteDistrictById(id: number): Promise<number> {
    return this.districtRepo.destroy({ where: { id } });
  }

  async updateDistrict(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    console.log(district);

    return district[1][0].dataValues;
  }
}
