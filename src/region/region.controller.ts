import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { Region } from './models/region.model';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create region' })
  @ApiResponse({ status: 200, description: 'New region' })
  @Post('create')
  async createRegion(@Body() createRegionDto: CreateRegionDto) {
    const region = await this.regionService.createRegion(createRegionDto);
    return region;
  }

  @ApiOperation({ summary: 'get all regiones' })
  @ApiResponse({ status: 200, description: 'get all region' })
  @Get('all/:q')
  async getAllRegion(
    @Query() q: any,
  ): Promise<{ regions: Region[]; count: number }> {
    return this.regionService.getAllRegions(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'get regions by id' })
  @ApiResponse({ status: 200, description: 'get region by id' })
  @Get(':id')
  async getRegionById(@Param('id') id: string): Promise<Region> {
    return this.regionService.getRegionById(+id);
  }

  @ApiOperation({ summary: 'get regions by name' })
  @ApiResponse({ status: 200, description: 'get region by name' })
  @Get('name/:name')
  async getRegionName(@Param('name') name: string): Promise<Region> {
    return this.regionService.getRegionByName(name);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete region' })
  @ApiResponse({ status: 200, description: 'delete region' })
  @Delete('delete/:id')
  async deleteRegionById(@Param('id') id: string): Promise<number> {
    return this.regionService.deleteRegionById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update region' })
  @ApiResponse({ status: 200, description: 'update region' })
  @Put('update/:id')
  async updateRegion(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    return this.regionService.updateRegion(+id, updateRegionDto);
  }
}
