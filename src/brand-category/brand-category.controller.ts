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
import { BrandCategoryService } from './brand-category.service';
import { CreateBrandCategoryDto } from './dto/create-brand-category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandCategory } from './model/brand-category.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Brand category')
@Controller('brand-category')
export class BrandCategoryController {
  constructor(private readonly brandCategoryService: BrandCategoryService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create brand category' })
  @ApiResponse({ type: BrandCategory })
  @Post()
  create(@Body() createAttributeDto: CreateBrandCategoryDto) {
    return this.brandCategoryService.create(createAttributeDto);
  }

  @ApiOperation({ summary: 'Get brand categories' })
  @ApiResponse({ type: [BrandCategory] })
  @Get()
  findAll() {
    return this.brandCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get brand category' })
  @ApiResponse({ type: BrandCategory })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandCategoryService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update brand category' })
  @ApiResponse({ type: [Number] })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandCategoryDto: UpdateBrandCategoryDto,
  ) {
    return this.brandCategoryService.update(+id, updateBrandCategoryDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete brand category' })
  @ApiResponse({ type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandCategoryService.remove(+id);
  }
}
