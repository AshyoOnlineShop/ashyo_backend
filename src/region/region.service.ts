import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private regionRepo: typeof Region,
  ) {}

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = await this.regionRepo.create(createRegionDto);
    return region;
  }

  async getAllRegions(
    page: number,
    limit: number,
  ): Promise<{ regions: Region[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const regions = await this.regionRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.regionRepo.count();
      return { regions, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getRegionById(id: number): Promise<Region> {
    const region = await this.regionRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return region;
  }

  async getRegionByName(name: string): Promise<Region> {
    console.log(name);
    const region = await this.regionRepo.findOne({
      where: { name },
      include: { all: true },
    });
    return region;
  }

  async deleteRegionById(id: number): Promise<number> {
    return this.regionRepo.destroy({ where: { id } });
  }

  async updateRegion(
    id: number,
    updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const region = await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true,
    });

    return region[1][0].dataValues;
  }
}
