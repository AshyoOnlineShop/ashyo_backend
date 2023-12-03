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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './models/delivery.model';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @ApiOperation({ summary: 'to create delivery' })
  @ApiResponse({ status: 200, description: 'New delivery' })
  @Post('create')
  async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    const delivery = await this.deliveryService.createDelivery(
      createDeliveryDto,
    );
    return delivery;
  }

  @ApiOperation({ summary: 'get all deliveryes' })
  @ApiResponse({ status: 200, description: 'get all delivery' })
  @Get('all/:q')
  async getAllDelivery(
    @Query() q: any,
  ): Promise<{ deliveries: Delivery[]; count: number }> {
    return this.deliveryService.getAllDeliverys(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'get deliverys by id' })
  @ApiResponse({ status: 200, description: 'get delivery by id' })
  @Get(':id')
  async getDeliveryById(@Param('id') id: string): Promise<Delivery> {
    return this.deliveryService.getDeliveryById(+id);
  }

  @ApiOperation({ summary: 'to delete delivery' })
  @ApiResponse({ status: 200, description: 'delete delivery' })
  @Delete('delete/:id')
  async deleteDeliveryById(@Param('id') id: string): Promise<number> {
    return this.deliveryService.deleteDeliveryById(+id);
  }

  @ApiOperation({ summary: 'to update delivery' })
  @ApiResponse({ status: 200, description: 'update delivery' })
  @Put('update/:id')
  async updateDelivery(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    return this.deliveryService.updateDelivery(+id, updateDeliveryDto);
  }
}
