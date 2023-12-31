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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AdminSelfGuard } from '../guards/admin.self.guard';
import { CustomerGuard } from '../guards/customer.guard';
import { AdminGuard } from '../guards/admin.guard';
import { DeliverGuard } from '../guards/deliver.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({ status: 200, description: 'New order created' })
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);
    return order;
  }

  // @UseGuards(AdminGuard || DeliverGuard)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Get all orders' })
  @Get('all/:q')
  async getAllOrders(
    @Query() q: any,
  ): Promise<{ orders: Order[]; count: number }> {
    return this.orderService.getAllOrders(q?.page, q?.limit);
  }

  // @UseGuards(AdminGuard || DeliverGuard)
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Get an order by ID' })
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(+id);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Delete an order' })
  @Delete('delete/:id')
  async deleteOrderById(@Param('id') id: string): Promise<number> {
    return this.orderService.deleteOrderById(+id);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 200, description: 'Update an order' })
  @Put('update/:id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(+id, updateOrderDto);
  }
}
