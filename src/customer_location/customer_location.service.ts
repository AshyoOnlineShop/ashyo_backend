import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerLocationDto } from './dto/create-customer_location.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerLocation } from './models/customer_location.model';
import { UpdateCustomerLocationDto } from './dto/update-customer_location.dto';

@Injectable()
export class CustomerLocationService {
  constructor(
    @InjectModel(CustomerLocation)
    private customerLocationRepo: typeof CustomerLocation,
  ) {}

  async createCustomerLocation(
    createCustomerLocationDto: CreateCustomerLocationDto,
  ): Promise<CustomerLocation> {
    const customerLocation = await this.customerLocationRepo.create(
      createCustomerLocationDto,
    );
    return customerLocation;
  }

  async getAllCustomerLocations(
    page: number,
    limit: number,
  ): Promise<{ customer_locations: CustomerLocation[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const customer_locations = await this.customerLocationRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.customerLocationRepo.count();
      return { customer_locations, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getCustomerLocationById(id: number): Promise<CustomerLocation> {
    const customerLocation = await this.customerLocationRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return customerLocation;
  }

  async deleteCustomerLocationById(id: number): Promise<number> {
    return this.customerLocationRepo.destroy({ where: { id } });
  }

  async updateCustomerLocation(
    id: number,
    updateCustomerLocationDto: UpdateCustomerLocationDto,
  ): Promise<CustomerLocation> {
    const customerLocation = await this.customerLocationRepo.update(
      updateCustomerLocationDto,
      {
        where: { id },
        returning: true,
      },
    );
    console.log(customerLocation);

    return customerLocation[1][0].dataValues;
  }
}
