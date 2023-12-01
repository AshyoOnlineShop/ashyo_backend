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
  Query,
} from '@nestjs/common';
import { BrandService } from './brands.service';
import { CreateBrandDto } from './dto/create-brands.dto';
import { Brand } from './models/brands.model';
import { UpdateBrandDto } from './dto/update-brands.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create brand' })
  @ApiResponse({ status: 200, description: 'New brand' })
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile()
    image: any,
  ) {
    const brand = await this.brandService.createBrand(createBrandDto, image);
    return brand;
  }

  @ApiOperation({ summary: 'get all brandes' })
  @ApiResponse({ status: 200, description: 'get all brand' })
  @Get('all/:q')
  async getAllBrand(
    @Query() q: any,
  ): Promise<{ brands: Brand[]; count: number }> {
    return this.brandService.getAllBrands(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'get brands by id' })
  @ApiResponse({ status: 200, description: 'get brand by id' })
  @Get(':id')
  async getBrandById(@Param('id') id: string): Promise<Brand> {
    return this.brandService.getBrandById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete brand' })
  @ApiResponse({ status: 200, description: 'delete brand' })
  @Delete('delete/:id')
  async deleteBrandById(@Param('id') id: string): Promise<number> {
    return this.brandService.deleteBrandById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update one brand by id' })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id')
    id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile()
    image: any,
  ) {
    return this.brandService.update(+id, updateBrandDto, image);
  }
}
