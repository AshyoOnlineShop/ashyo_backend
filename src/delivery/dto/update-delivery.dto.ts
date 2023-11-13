import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryDto } from './create-delivery.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @ApiProperty({
    example: 123,
    description: 'Order ID',
  })
  @IsNumber()
  order_id: number;

  @ApiProperty({
    example: 456,
    description: 'Deliver ID',
  })
  @IsNumber()
  deliver_id: number;

  @ApiProperty({
    example: 50.99,
    description: 'Delivering Price',
  })
  @IsNumber()
  delivering_price: number;

  @ApiProperty({
    example: true,
    description: 'Delivery Status',
  })
  @IsBoolean()
  status: boolean;
}
