import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommercialDto } from './dto/create-commercial.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Commercial } from './models/commercial.model';
import { UpdateCommercialDto } from './dto/update-commercial.dto';
import { FilesService } from '../file_uploads/file_uploads.service';

@Injectable()
export class CommercialService {
  constructor(
    @InjectModel(Commercial)
    private commercialRepo: typeof Commercial,
    private filesService: FilesService,
  ) {}

  async create(createCommercialDto: CreateCommercialDto, image: any) {
    try {
      const fileName = await this.filesService.createFile(image);
      const commercial = await this.commercialRepo.create({
        ...createCommercialDto,
        image: fileName,
      });

      return { message: 'Created successfully', commercial };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCommercials(
    page: number,
    limit: number,
  ): Promise<{ commercials: Commercial[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const commercials = await this.commercialRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.commercialRepo.count();
      return { commercials, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getCommercialById(id: number): Promise<Commercial> {
    const commercial = await this.commercialRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return commercial;
  }

  async deleteCommercialById(id: number): Promise<number> {
    return this.commercialRepo.destroy({ where: { id } });
  }

  async update(
    id: number,
    updateCommercialDto: UpdateCommercialDto,
    image: any,
  ) {
    const commercial = await this.commercialRepo.findByPk(id);
    if (!commercial) {
      throw new NotFoundException('category not found with such id');
    }
    const fileName = await this.filesService.createFile(image);
    const updated = await this.commercialRepo.update(
      { ...updateCommercialDto, image: fileName },
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
}
