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
import { ViewedProductsService } from './viewed_products.service';
import { CreateViewedProductDto } from './dto/create-viewed_product.dto';
import { UpdateViewedProductDto } from './dto/update-viewed_product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from '../guards/customer.guard';

@ApiTags('Viewed Products')
@Controller('viewed-products')
export class ViewedProductsController {
  constructor(private readonly viewedProductsService: ViewedProductsService) {}

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Create viewed products' })
  @Post()
  create(@Body() createViewedProductDto: CreateViewedProductDto) {
    return this.viewedProductsService.create(createViewedProductDto);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Get all viewed products' })
  @Get()
  findAll() {
    return this.viewedProductsService.findAll();
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Get viewed product by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewedProductsService.findOne(+id);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Update viewed product by id' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateViewedProductDto: UpdateViewedProductDto,
  ) {
    return this.viewedProductsService.update(+id, updateViewedProductDto);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Delete viewed product by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewedProductsService.remove(+id);
  }
}
