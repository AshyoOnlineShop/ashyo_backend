import { ViewedProduct } from './model/viewed_product.model';
import { Injectable } from '@nestjs/common';
import { CreateViewedProductDto } from './dto/create-viewed_product.dto';
import { UpdateViewedProductDto } from './dto/update-viewed_product.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ViewedProductsService {
  constructor(@InjectModel(ViewedProduct) private ViewedProductRepository: typeof ViewedProduct ){}

  async create(createViewedProductDto: CreateViewedProductDto) {
    const comment = await  this.ViewedProductRepository.create(createViewedProductDto)

    return comment;
  }

  async findAll() {
    const cart = await this.ViewedProductRepository.findAll({include:{all:true}});

    return cart;
  }

  async findOne(id: number) {
    const cart = await this.ViewedProductRepository.findOne({where:{id}})

    return cart;
  }

 async  update(id: number, updateViewedProductDto: UpdateViewedProductDto) {
  const cart = await this.ViewedProductRepository.update(updateViewedProductDto,{where:{id}})
   
  return cart;
  }

  async remove(id: number) {
    const cart= await this.ViewedProductRepository.destroy({where:{id}})

    return cart;
  }
}
