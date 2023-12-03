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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { District } from './models/district.model';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create district' })
  @ApiResponse({ status: 200, description: 'New district' })
  @Post('create')
  async createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    const district = await this.districtService.createDistrict(
      createDistrictDto,
    );
    return district;
  }

  @ApiOperation({ summary: 'get all districtes' })
  @ApiResponse({ status: 200, description: 'get all district' })
  @Get('all/:q')
  async getAllDistrict(
    @Query() q: any,
  ): Promise<{ districts: District[]; count: number }> {
    return this.districtService.getAllDistricts(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'get districts by id' })
  @ApiResponse({ status: 200, description: 'get district by id' })
  @Get(':id')
  async getDistrictById(@Param('id') id: string): Promise<District> {
    return this.districtService.getDistrictById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete district' })
  @ApiResponse({ status: 200, description: 'delete district' })
  @Delete('delete/:id')
  async deleteDistrictById(@Param('id') id: string): Promise<number> {
    return this.districtService.deleteDistrictById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update district' })
  @ApiResponse({ status: 200, description: 'update district' })
  @Put('update/:id')
  async updateDistrict(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    return this.districtService.updateDistrict(+id, updateDistrictDto);
  }
}
