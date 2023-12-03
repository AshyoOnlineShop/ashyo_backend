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
import { SaleProductsService } from './sale-products.service';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaleProducts } from './model/sale-product.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Sale products')
@Controller('sale-products')
export class SaleProductsController {
  constructor(private readonly saleProductsService: SaleProductsService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create sale product' })
  @ApiResponse({ type: SaleProducts })
  @Post()
  create(@Body() createAttributeDto: CreateSaleProductDto) {
    return this.saleProductsService.create(createAttributeDto);
  }

  @ApiOperation({ summary: 'Get sale products' })
  @ApiResponse({ type: [SaleProducts] })
  @Get('all/:q')
  findAll(
    @Query() q: any,
  ): Promise<{ sale_products: SaleProducts[]; count: number }> {
    return this.saleProductsService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'Get sale porduct' })
  @ApiResponse({ type: SaleProducts })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleProductsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update sale product' })
  @ApiResponse({ type: [Number] })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandCategoryDto: UpdateSaleProductDto,
  ) {
    return this.saleProductsService.update(+id, updateBrandCategoryDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete sale product' })
  @ApiResponse({ type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleProductsService.remove(+id);
  }
}
