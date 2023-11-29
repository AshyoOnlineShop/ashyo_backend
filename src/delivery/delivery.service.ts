import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery } from './models/delivery.model';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery)
    private deliveryRepo: typeof Delivery,
  ) {}

  async createDelivery(
    createDeliveryDto: CreateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepo.create(createDeliveryDto);
    return delivery;
  }

  async getAllDeliverys(): Promise<Delivery[]> {
    const delivery = await this.deliveryRepo.findAll({
      include: { all: true },
    });
    return delivery;
  }

  async getDeliveryById(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return delivery;
  }

  async deleteDeliveryById(id: number): Promise<number> {
    return this.deliveryRepo.destroy({ where: { id } });
  }

  async updateDelivery(
    id: number,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepo.update(updateDeliveryDto, {
      where: { id },
      returning: true,
    });
    console.log(delivery);

    return delivery[1][0].dataValues;
  }
}
