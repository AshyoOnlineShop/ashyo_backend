import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewedProductsService } from './viewed_products.service';
import { CreateViewedProductDto } from './dto/create-viewed_product.dto';
import { UpdateViewedProductDto } from './dto/update-viewed_product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Viewed Products')

@Controller('viewed-products')
export class ViewedProductsController {
  constructor(private readonly viewedProductsService: ViewedProductsService) {}

  @ApiOperation({summary: "Foydalanuvchini yaratish"})
  @Post()
  create(@Body() createViewedProductDto: CreateViewedProductDto) {
    return this.viewedProductsService.create(createViewedProductDto);
  }

  @ApiOperation({summary: "baarcha foydalanuvchilarni chiqarish"})
  @Get()
  findAll() {
    return this.viewedProductsService.findAll();
  }

  @ApiOperation({summary: "id bo'yicha  chiqarish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewedProductsService.findOne(+id);
  }

  @ApiOperation({summary: "id bo'yicha  patch qilish"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewedProductDto: UpdateViewedProductDto) {
    return this.viewedProductsService.update(+id, updateViewedProductDto);
  }

  @ApiOperation({summary: "id bo'yicha  o'chirish"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewedProductsService.remove(+id);
  }
}
