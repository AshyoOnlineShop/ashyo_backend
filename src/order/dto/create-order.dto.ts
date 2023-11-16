import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({ example: 1, description: 'customer location id' })
  @IsNumber()
  @IsNotEmpty()
  customer_location_id: number;

  @ApiProperty({ example: 1, description: 'payment id' })
  @IsNumber()
  @IsNotEmpty()
  payment_id: number;

  @ApiProperty({ example: '2023-11-12', description: 'ordering date' })
  @IsDate()
  @IsNotEmpty()
  ordering_date: Date;

  @ApiProperty({ example: true, description: 'order status' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
