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
import { CustomerLocationService } from './customer_location.service';
import { CreateCustomerLocationDto } from './dto/create-customer_location.dto';
import { CustomerLocation } from './models/customer_location.model';
import { UpdateCustomerLocationDto } from './dto/update-customer_location.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AdminSelfGuard } from '../guards/admin.self.guard';
// import { AdminGuard } from '../guards/admin.guard';

@ApiTags('CustomerLocation')
@Controller('customerLocation')
export class CustomerLocationController {
  constructor(private readonly customerLocationService: CustomerLocationService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create customerLocation' })
  @ApiResponse({ status: 200, description: 'New customerLocation' })
  @Post('create')
  async createCustomerLocation(@Body() createCustomerLocationDto: CreateCustomerLocationDto) {
    const customerLocation = await this.customerLocationService.createCustomerLocation(
      createCustomerLocationDto,
    );
    return customerLocation;
  }

  @ApiOperation({ summary: 'get all customerLocationes' })
  @ApiResponse({ status: 200, description: 'get all customerLocation' })
  @Get('all')
  async getAllCustomerLocation(): Promise<CustomerLocation[]> {
    return this.customerLocationService.getAllCustomerLocations();
  }

  @ApiOperation({ summary: 'get customerLocations by id' })
  @ApiResponse({ status: 200, description: 'get customerLocation by id' })
  @Get(':id')
  async getCustomerLocationById(@Param('id') id: string): Promise<CustomerLocation> {
    return this.customerLocationService.getCustomerLocationById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete customerLocation' })
  @ApiResponse({ status: 200, description: 'delete customerLocation' })
  @Delete('delete/:id')
  async deleteCustomerLocationById(@Param('id') id: string): Promise<number> {
    return this.customerLocationService.deleteCustomerLocationById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update customerLocation' })
  @ApiResponse({ status: 200, description: 'update customerLocation' })
  @Put('update/:id')
  async updateCustomerLocation(
    @Param('id') id: string,
    @Body() updateCustomerLocationDto: UpdateCustomerLocationDto,
  ): Promise<CustomerLocation> {
    return this.customerLocationService.updateCustomerLocation(+id, updateCustomerLocationDto);
  }
}
