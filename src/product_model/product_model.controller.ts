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
import { ProductModelService } from './product_model.service';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { ProductModel } from './models/product_model.model';
import { UpdateProductModelDto } from './dto/update-product_model.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AdminSelfGuard } from '../guards/admin.self.guard';
// import { AdminGuard } from '../guards/admin.guard';

@ApiTags('ProductModel')
@Controller('product_model')
export class ProductModelController {
  constructor(private readonly product_modelService: ProductModelService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create product_model' })
  @ApiResponse({ status: 200, description: 'New product_model' })
  @Post('create')
  async createProductModel(@Body() createProductModelDto: CreateProductModelDto) {
    const product_model = await this.product_modelService.createProductModel(
      createProductModelDto,
    );
    return product_model;
  }

  @ApiOperation({ summary: 'get all product_modeles' })
  @ApiResponse({ status: 200, description: 'get all product_model' })
  @Get('all')
  async getAllProductModel(): Promise<ProductModel[]> {
    return this.product_modelService.getAllProductModels();
  }

  @ApiOperation({ summary: 'get product_models by id' })
  @ApiResponse({ status: 200, description: 'get product_model by id' })
  @Get(':id')
  async getProductModelById(@Param('id') id: string): Promise<ProductModel> {
    return this.product_modelService.getProductModelById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete product_model' })
  @ApiResponse({ status: 200, description: 'delete product_model' })
  @Delete('delete/:id')
  async deleteProductModelById(@Param('id') id: string): Promise<number> {
    return this.product_modelService.deleteProductModelById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update product_model' })
  @ApiResponse({ status: 200, description: 'update product_model' })
  @Put('update/:id')
  async updateProductModel(
    @Param('id') id: string,
    @Body() updateProductModelDto: UpdateProductModelDto,
  ): Promise<ProductModel> {
    return this.product_modelService.updateProductModel(+id, updateProductModelDto);
  }
}
