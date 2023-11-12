import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    example: 123,
    description: 'Order ID',
  })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({
    example: 456,
    description: 'Deliver ID',
  })
  @IsNumber()
  @IsNotEmpty()
  deliver_id: number;

  @ApiProperty({
    example: 50.99,
    description: 'Delivering Price',
  })
  @IsNumber()
  @IsNotEmpty()
  delivering_price: number;

  @ApiProperty({
    example: true,
    description: 'Delivery Status',
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
