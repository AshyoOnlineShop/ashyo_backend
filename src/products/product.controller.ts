import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.model';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create product' })
  @ApiResponse({ status: 200, description: 'New product' })
  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);
    return product;
  }

  @ApiOperation({ summary: 'get all productes' })
  @ApiResponse({ status: 200, description: 'get all product' })
  @Get('all')
  async getAllProduct(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'get products by id' })
  @ApiResponse({ status: 200, description: 'get product by id' })
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete product' })
  @ApiResponse({ status: 200, description: 'delete product' })
  @Delete('delete/:id')
  async deleteProductById(@Param('id') id: string): Promise<number> {
    return this.productService.deleteProductById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update product' })
  @ApiResponse({ status: 200, description: 'update product' })
  @Put('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(+id, updateProductDto);
  }
}
