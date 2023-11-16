import { Module } from '@nestjs/common';
import { AdminCustomerService } from './admin_customer.service';
import { AdminCustomerController } from './admin_customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminCustomer } from './models/admin_customer.model';

@Module({
  imports: [SequelizeModule.forFeature([AdminCustomer])],
  controllers: [AdminCustomerController],
  providers: [AdminCustomerService],
})
export class AdminCustomerModule {}
