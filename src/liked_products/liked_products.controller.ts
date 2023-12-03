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
import { LikedProductsService } from './liked_products.service';
import { CreateLikedProductDto } from './dto/create-liked_product.dto';
import { UpdateLikedProductDto } from './dto/update-liked_product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { LikedProduct } from './models/liked_product.model';

@ApiTags('Liked products')
@Controller('liked-products')
export class LikedProductsController {
  constructor(private readonly likedProductsService: LikedProductsService) {}

  @ApiOperation({ summary: 'Foydalanuvchini yaratish' })
  @Post()
  create(@Body() createLikedProductDto: CreateLikedProductDto) {
    return this.likedProductsService.create(createLikedProductDto);
  }

  @ApiOperation({ summary: 'barcha foydalanuvchilarni chiqarish' })
  @Get('all/:q')
  findAll(
    @Query() q: any,
  ): Promise<{ liked_products: LikedProduct[]; count: number }> {
    return this.likedProductsService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: "id bo'yicha  chiqarish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likedProductsService.findOne(+id);
  }

  @ApiOperation({ summary: "id bo'yicha  patch qilish" })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLikedProductDto: UpdateLikedProductDto,
  ) {
    return this.likedProductsService.update(+id, updateLikedProductDto);
  }

  @ApiOperation({ summary: "id bo'yicha  o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likedProductsService.remove(+id);
  }
}
