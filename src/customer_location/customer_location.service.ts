import { Injectable } from '@nestjs/common';
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

  async createCustomerLocation(createCustomerLocationDto: CreateCustomerLocationDto): Promise<CustomerLocation> {
    const customerLocation = await this.customerLocationRepo.create(createCustomerLocationDto);
    return customerLocation;
  }

  async getAllCustomerLocations(): Promise<CustomerLocation[]> {
    const customerLocation = await this.customerLocationRepo.findAll({ include: { all: true } });
    return customerLocation;
  }

  async getCustomerLocationById(id: number): Promise<CustomerLocation> {
    const customerLocation = await this.customerLocationRepo.findOne({
      where: { id },
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
    const customerLocation = await this.customerLocationRepo.update(updateCustomerLocationDto, {
      where: { id },
      returning: true,
    });
    console.log(customerLocation);
    
    return customerLocation[1][0].dataValues;
  }
}
