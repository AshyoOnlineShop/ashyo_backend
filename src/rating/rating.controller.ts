import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Rating } from './models/rating.model';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: "id bo'yicha chiqarish" })
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @ApiOperation({ summary: "barcha foydalanuvchilar rating'ini chiqarish" })
  @Get('all/:q')
  findAll(@Query() q: any): Promise<{ ratings: Rating[]; count: number }> {
    return this.ratingService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: "id bo'yicha chiqarish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @ApiOperation({ summary: "id bo'yicha patch qilish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @ApiOperation({ summary: "id bo'yicha o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
