import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from '../guards/customer.guard';
import { Comment } from './models/comment.model';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Foydalanuvchini create qilish' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiOperation({
    summary: 'Foydalanuvchilarni kommentini barchasini chiqarish',
  })
  @ApiResponse({ status: 200, description: 'get all comments' })
  @Get('all/:q')
  findAll(@Query() q: any): Promise<{ comments: Comment[]; count: number }> {
    return this.commentsService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: "id bo'yicha chiqarish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: "id bo'yicha update qilish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: "id bo'yicha o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
