import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './model/category.model';
import { AdminGuard } from '../guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create category' })
  @ApiResponse({ status: 200, description: 'New category' })
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile()
    image: any,
  ) {
    const category = await this.categoryService.create(
      createCategoryDto,
      image,
    );
    return category;
  }

  @ApiOperation({ summary: 'Get categories' })
  @ApiResponse({ type: [Category] })
  @Get('all/:q')
  findAll(@Query() q: any): Promise<{ categories: Category[]; count: number }> {
    return this.categoryService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'Get category' })
  @ApiResponse({ type: Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'update category' })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image: any,
  ) {
    return this.categoryService.update(+id, updateCategoryDto, image);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ type: [Number] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
