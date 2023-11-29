import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductInfoService } from './product-info.service';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductInfo } from './model/product-info.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Product info')
@Controller('product-info')
export class ProductInfoController {
  constructor(private readonly productInfoService: ProductInfoService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create product info' })
  @ApiResponse({ type: ProductInfo })
  @Post()
  create(@Body() createAttributeDto: CreateProductInfoDto) {
    return this.productInfoService.create(createAttributeDto);
  }

  @ApiOperation({ summary: 'Get product info' })
  @ApiResponse({ type: [ProductInfo] })
  @Get()
  findAll() {
    return this.productInfoService.findAll();
  }

  @ApiOperation({ summary: 'Get product info' })
  @ApiResponse({ type: ProductInfo })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInfoService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update product info' })
  @ApiResponse({ type: [Number] })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateProductInfoDto,
  ) {
    return this.productInfoService.update(+id, updateAttributeDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete product info' })
  @ApiResponse({ type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInfoService.remove(+id);
  }
}
