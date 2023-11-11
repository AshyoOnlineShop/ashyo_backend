import { Module } from '@nestjs/common';
import { CustomerLocationService } from './customer_location.service';
import { CustomerLocationController } from './customer_location.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerLocation } from './models/customer_location.model';

@Module({
  imports: [SequelizeModule.forFeature([CustomerLocation])],
  controllers: [CustomerLocationController],
  providers: [CustomerLocationService],
})
export class CustomerLocationModule {}
