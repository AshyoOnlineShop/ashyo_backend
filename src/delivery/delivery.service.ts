import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getAllDeliverys(
    page: number,
    limit: number,
  ): Promise<{ deliveries: Delivery[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const deliveries = await this.deliveryRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.deliveryRepo.count();
      return { deliveries, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
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
