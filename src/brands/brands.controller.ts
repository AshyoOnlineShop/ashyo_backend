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
import { BrandService } from './brands.service';
import { CreateBrandDto } from './dto/create-brands.dto';
import { Brand } from './models/brands.model';
import { UpdateBrandDto } from './dto/update-brands.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create brand' })
  @ApiResponse({ status: 200, description: 'New brand' })
  @Post('create')
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    const brand = await this.brandService.createBrand(
      createBrandDto,
    );
    return brand;
  }

  @ApiOperation({ summary: 'get all brandes' })
  @ApiResponse({ status: 200, description: 'get all brand' })
  @Get('all')
  async getAllBrand(): Promise<Brand[]> {
    return this.brandService.getAllBrands();
  }

  @ApiOperation({ summary: 'get brands by id' })
  @ApiResponse({ status: 200, description: 'get brand by id' })
  @Get(':id')
  async getBrandById(@Param('id') id: string): Promise<Brand> {
    return this.brandService.getBrandById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete brand' })
  @ApiResponse({ status: 200, description: 'delete brand' })
  @Delete('delete/:id')
  async deleteBrandById(@Param('id') id: string): Promise<number> {
    return this.brandService.deleteBrandById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update brand' })
  @ApiResponse({ status: 200, description: 'update brand' })
  @Put('update/:id')
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandService.updateBrand(+id, updateBrandDto);
  }
}
