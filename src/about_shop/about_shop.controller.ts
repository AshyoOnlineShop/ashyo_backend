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
import { AboutShopService } from './about_shop.service';
import { CreateAboutShopDto } from './dto/create-about_shop.dto';
import { AboutShop } from './models/about_shop.model';
import { UpdateAboutShopDto } from './dto/update-about_shop.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('AboutShop')
@Controller('aboutShop')
export class AboutShopController {
  constructor(private readonly aboutShopService: AboutShopService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create aboutShop' })
  @ApiResponse({ status: 200, description: 'New aboutShop' })
  @Post('create')
  async createAboutShop(@Body() createAboutShopDto: CreateAboutShopDto) {
    const aboutShop = await this.aboutShopService.createAboutShop(
      createAboutShopDto,
    );
    return aboutShop;
  }

  @ApiOperation({ summary: 'get all aboutShopes' })
  @ApiResponse({ status: 200, description: 'get all aboutShop' })
  @Get('all')
  async getAllAboutShop(): Promise<AboutShop[]> {
    return this.aboutShopService.getAllAboutShops();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'get aboutShops by id' })
  @ApiResponse({ status: 200, description: 'get aboutShop by id' })
  @Get(':id')
  async getAboutShopById(@Param('id') id: string): Promise<AboutShop> {
    return this.aboutShopService.getAboutShopById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete aboutShop' })
  @ApiResponse({ status: 200, description: 'delete aboutShop' })
  @Delete('delete/:id')
  async deleteAboutShopById(@Param('id') id: string): Promise<number> {
    return this.aboutShopService.deleteAboutShopById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update aboutShop' })
  @ApiResponse({ status: 200, description: 'update aboutShop' })
  @Put('update/:id')
  async updateAboutShop(
    @Param('id') id: string,
    @Body() updateAboutShopDto: UpdateAboutShopDto,
  ): Promise<AboutShop> {
    return this.aboutShopService.updateAboutShop(+id, updateAboutShopDto);
  }
}
