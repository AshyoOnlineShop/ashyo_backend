import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductMediaService } from './product_media.service';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { ProductMedia } from './models/product_media.model';
import { UpdateProductMediaDto } from './dto/update-product_media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('ProductMedia')
@Controller('product_media')
export class ProductMediaController {
  constructor(private readonly product_mediaService: ProductMediaService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create product_media' })
  @ApiResponse({ status: 200, description: 'New product_media' })
  @Post('create')
  @UseInterceptors(FileInterceptor('url'))
  async createProductMedia(
    @Body() createProductMediaDto: CreateProductMediaDto,
    @UploadedFile()
    url: any,
  ) {
    const product_media = await this.product_mediaService.createProductMedia(
      createProductMediaDto,
      url,
    );
    return product_media;
  }

  @ApiOperation({ summary: 'get all product_mediaes' })
  @ApiResponse({ status: 200, description: 'get all product_media' })
  @Get('all')
  async getAllProductMedia(): Promise<ProductMedia[]> {
    return this.product_mediaService.getAllProductMedias();
  }

  @ApiOperation({ summary: 'get product_medias by id' })
  @ApiResponse({ status: 200, description: 'get product_media by id' })
  @Get(':id')
  async getProductMediaById(@Param('id') id: string): Promise<ProductMedia> {
    return this.product_mediaService.getProductMediaById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete product_media' })
  @ApiResponse({ status: 200, description: 'delete product_media' })
  @Delete('delete/:id')
  async deleteProductMediaById(@Param('id') id: string): Promise<number> {
    return this.product_mediaService.deleteProductMediaById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update product_media' })
  @ApiResponse({ status: 200, description: 'update product_media' })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('url'))
  async updateProductMedia(
    @Param('id')
    id: string,
    @Body() updateProductMediaDto: UpdateProductMediaDto,
    @UploadedFile()
    url: any,
  ): Promise<ProductMedia> {
    return this.product_mediaService.updateProductMedia(
      +id,
      updateProductMediaDto,
      url,
    );
  }
}
