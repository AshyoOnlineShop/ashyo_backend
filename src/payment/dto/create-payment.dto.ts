import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'card id' })
  @IsNumber()
  @IsNotEmpty()
  card_id: number;

  @ApiProperty({ example: 1, description: 'customer card id' })
  @IsNumber()
  @IsNotEmpty()
  customer_card_id: number;

  @ApiProperty({ example: true, description: 'payment type' })
  @IsBoolean()
  @IsNotEmpty()
  payment_type: boolean;

  @ApiProperty({ example: '2023-11-12', description: 'payment date' })
  @IsString()
  @IsNotEmpty()
  payment_date: string;

  @ApiProperty({ example: 100.5, description: 'total price' })
  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  @ApiProperty({ example: true, description: 'payment status' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
