import { Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import {Stuff} from './model/stuff.model'


@Injectable()
export class StuffService {  
  async create(createStuffDto: CreateStuffDto) {
    return await Stuff.create(createStuffDto)
  }

  async findAll() {
    return Stuff.findAll()
  }

  async findOne(id: number) {
    return await Stuff.findOne({where: {id}})
  }

  async update(id: number, updateStuffDto: UpdateStuffDto) {
    return await Stuff.update(updateStuffDto,{where: {id}})
  }

  async remove(id: number) {
    return await Stuff.destroy({where: {id}})
  }
}
