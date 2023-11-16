import { Injectable } from '@nestjs/common';
import { CreateAdminCustomerDto } from './dto/create-admin_customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminCustomer } from './models/admin_customer.model';
import { UpdateAdminCustomerDto } from './dto/update-admin_customer.dto';

@Injectable()
export class AdminCustomerService {
  constructor(
    @InjectModel(AdminCustomer)
    private admin_customerRepo: typeof AdminCustomer,
  ) {}

  async createAdminCustomer(
    createAdminCustomerDto: CreateAdminCustomerDto,
  ): Promise<AdminCustomer> {
    const admin_customer = await this.admin_customerRepo.create(createAdminCustomerDto);
    return admin_customer;
  }

  async getAllAdminCustomers(): Promise<AdminCustomer[]> {
    const admin_customer = await this.admin_customerRepo.findAll({
      include: { all: true },
    });
    return admin_customer;
  }

  async getAdminCustomerById(id: number): Promise<AdminCustomer> {
    const admin_customer = await this.admin_customerRepo.findOne({
      where: { id },
      include: { all: true }
    });
    return admin_customer;
  }

  async deleteAdminCustomerById(id: number): Promise<number> {
    return this.admin_customerRepo.destroy({ where: { id } });
  }

  async updateAdminCustomer(
    id: number,
    updateAdminCustomerDto: UpdateAdminCustomerDto,
  ): Promise<AdminCustomer> {
    const admin_customer = await this.admin_customerRepo.update(updateAdminCustomerDto, {
      where: { id },
      returning: true,
    });
    console.log(admin_customer);

    return admin_customer[1][0].dataValues;
  }
}
