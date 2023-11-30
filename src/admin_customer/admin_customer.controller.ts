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
import { AdminCustomerService } from './admin_customer.service';
import { CreateAdminCustomerDto } from './dto/create-admin_customer.dto';
import { AdminCustomer } from './models/admin_customer.model';
import { UpdateAdminCustomerDto } from './dto/update-admin_customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AdminCustomer')
@Controller('admin_customer')
export class AdminCustomerController {
  constructor(private readonly admin_customerService: AdminCustomerService) {}

  @ApiOperation({ summary: 'to create admin_customer' })
  @ApiResponse({ status: 200, description: 'New admin_customer' })
  @Post('create')
  async createAdminCustomer(@Body() createAdminCustomerDto: CreateAdminCustomerDto) {
    const admin_customer = await this.admin_customerService.createAdminCustomer(
      createAdminCustomerDto,
    );
    return admin_customer;
  }

  @ApiOperation({ summary: 'get all admin_customeres' })
  @ApiResponse({ status: 200, description: 'get all admin_customer' })
  @Get('all')
  async getAllAdminCustomer(): Promise<AdminCustomer[]> {
    return this.admin_customerService.getAllAdminCustomers();
  }

  @ApiOperation({ summary: 'get admin_customers by id' })
  @ApiResponse({ status: 200, description: 'get admin_customer by id' })
  @Get(':id')
  async getAdminCustomerById(@Param('id') id: string): Promise<AdminCustomer> {
    return this.admin_customerService.getAdminCustomerById(+id);
  }

  @ApiOperation({ summary: 'to delete admin_customer' })
  @ApiResponse({ status: 200, description: 'delete admin_customer' })
  @Delete('delete/:id')
  async deleteAdminCustomerById(@Param('id') id: string): Promise<number> {
    return this.admin_customerService.deleteAdminCustomerById(+id);
  }

  @ApiOperation({ summary: 'to update admin_customer' })
  @ApiResponse({ status: 200, description: 'update admin_customer' })
  @Put('update/:id')
  async updateAdminCustomer(
    @Param('id') id: string,
    @Body() updateAdminCustomerDto: UpdateAdminCustomerDto,
  ): Promise<AdminCustomer> {
    return this.admin_customerService.updateAdminCustomer(+id, updateAdminCustomerDto);
  }
}
