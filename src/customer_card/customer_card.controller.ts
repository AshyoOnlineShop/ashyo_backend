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
import { CustomerCardService } from './customer_card.service';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { CustomerCard } from './models/customer_card.model';
import { UpdateCustomerCardDto } from './dto/update-card_types.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from '../guards/customer.guard';

@ApiTags('CustomerCard')
@Controller('customer_card')
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Create a new customer card' })
  @ApiResponse({ status: 200, description: 'New customer card' })
  @Post('create')
  async createCustomerCard(
    @Body() createCustomerCardDto: CreateCustomerCardDto,
  ): Promise<CustomerCard> {
    const customerCard = await this.customerCardService.createCustomerCard(
      createCustomerCardDto,
    );
    return customerCard;
  }

  @ApiOperation({ summary: 'Get all customer cards' })
  @ApiResponse({ status: 200, description: 'Get all customer cards' })
  @Get('all')
  async getAllCustomerCards(): Promise<CustomerCard[]> {
    return this.customerCardService.getAllCustomerCards();
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Get customer card by ID' })
  @ApiResponse({ status: 200, description: 'Get customer card by ID' })
  @Get(':id')
  async getCustomerCardById(@Param('id') id: string): Promise<CustomerCard> {
    return this.customerCardService.getCustomerCardById(+id);
  }

  //   @ApiOperation({ summary: 'Get customer card by name' })
  //   @ApiResponse({ status: 200, description: 'Get customer card by name' })
  //   @Get('name/:name')
  //   async getCustomerCardByName(
  //     @Param('name') name: string,
  //   ): Promise<CustomerCard> {
  //     return this.customerCardService.getCustomerCardByName(name);
  //   }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Delete customer card by ID' })
  @ApiResponse({ status: 200, description: 'Delete customer card by ID' })
  @Delete('delete/:id')
  async deleteCustomerCardById(@Param('id') id: string): Promise<number> {
    return this.customerCardService.deleteCustomerCardById(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Update customer card by ID' })
  @ApiResponse({ status: 200, description: 'Update customer card by ID' })
  @Put('update/:id')
  async updateCustomerCard(
    @Param('id') id: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto,
  ): Promise<CustomerCard> {
    return this.customerCardService.updateCustomerCard(
      +id,
      updateCustomerCardDto,
    );
  }
}
