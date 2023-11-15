import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNumber()
  customer_id?: number;

  @ApiProperty({ example: 1, description: 'customer location id' })
  @IsNumber()
  customer_location_id?: number;

  @ApiProperty({ example: 1, description: 'payment id' })
  @IsNumber()
  payment_id?: number;

  @ApiProperty({ example: '2023-11-12', description: 'ordering date' })
  @IsDate()
  ordering_date?: Date;

  @ApiProperty({ example: true, description: 'order status' })
  @IsBoolean()
  status?: boolean;
}
