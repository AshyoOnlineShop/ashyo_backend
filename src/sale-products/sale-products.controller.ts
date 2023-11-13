import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaleProducts } from './model/sale-product.model';

@ApiTags('Sale products')
@Controller('sale-products')
export class SaleProductsController {
  constructor(private readonly saleProductsService: SaleProductsService) {}

  @ApiOperation({ summary: 'Create sale product' })
  @ApiResponse({ type: SaleProducts })
  @Post()
  create(@Body() createAttributeDto: CreateSaleProductDto) {
    return this.saleProductsService.create(createAttributeDto);
  }

  @ApiOperation({ summary: 'Get sale products' })
  @ApiResponse({ type: [SaleProducts] })
  @Get()
  findAll() {
    return this.saleProductsService.findAll();
  }

  @ApiOperation({ summary: 'Get sale porduct' })
  @ApiResponse({ type: SaleProducts })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleProductsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update sale product' })
  @ApiResponse({ type: [Number] })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandCategoryDto: UpdateSaleProductDto,
  ) {
    return this.saleProductsService.update(+id, updateBrandCategoryDto);
  }

  @ApiOperation({ summary: 'Delete sale product' })
  @ApiResponse({ type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleProductsService.remove(+id);
  }
}
