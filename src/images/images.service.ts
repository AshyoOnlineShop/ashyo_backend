import { CreateImgDto } from './dto/create-img.dto';
import { Injectable } from '@nestjs/common';
import { Img } from './model/img.model';

//========================== MULTER =======================================

// Import multer

@Injectable()
export class ImgService {
  async create(name: any, product_id) {
    await Img.create({ name, product_id });
    return {
      message: 'Image uploaded and created successfully',
    }; 
  }

  async findAll() {
    return Img.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await Img.findOne({ where: { id }, include: { all: true } });
  }

  // async update(id: number, updateImgDto: UpdateImgDto) {
  //   return await Img.update(updateImgDto, { where: { id } });
  // }

  async remove(id: number) {
    return await Img.destroy({ where: { id } });
  }
}
