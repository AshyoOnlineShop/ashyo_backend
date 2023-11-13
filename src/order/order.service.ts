import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderRepo: typeof Order,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepo.create(createOrderDto);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepo.findAll({ include: { all: true } });
    return orders;
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return order;
  }

  async deleteOrderById(id: number): Promise<number> {
    return this.orderRepo.destroy({ where: { id } });
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const [_, [updatedOrder]] = await this.orderRepo.update(updateOrderDto, {
      where: { id },
      returning: true,
    });
    return updatedOrder;
  }
}
