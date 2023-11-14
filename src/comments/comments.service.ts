import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import {Comment } from './model/comment.model'

@Injectable()
export class CommentsService {
  constructor (@InjectModel(Comment) private CommentRepository: typeof Comment){}
 
  
  async  create(createCommentDto: CreateCommentDto) {
    const comment = await  this.CommentRepository.create(createCommentDto)
    return comment;
  }

  async findAll() {
    const cart = await this.CommentRepository.findAll({include:{all:true}});
    return cart;
  }

  async findOne(id: number) {
    const cart = await this.CommentRepository.findOne({where:{id}})
    return cart;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const cart = await this.CommentRepository.update(updateCommentDto,{where:{id}})
    return cart;
  }

  async remove(id: number) {
    const cart= await this.CommentRepository.destroy({where:{id}})
    return cart;
  }
}
