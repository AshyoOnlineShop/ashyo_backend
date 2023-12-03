import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private CommentRepository: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.CommentRepository.create(createCommentDto);
    return comment;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ comments: Comment[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const comments = await this.CommentRepository.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.CommentRepository.count();
      return { comments, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async findOne(id: number) {
    const comments = await this.CommentRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return comments;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comments = await this.CommentRepository.update(updateCommentDto, {
      where: { id },
    });
    return comments;
  }

  async remove(id: number) {
    const comments = await this.CommentRepository.destroy({ where: { id } });
    return comments;
  }
}
