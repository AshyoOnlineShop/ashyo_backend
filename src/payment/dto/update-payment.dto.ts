import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ example: 1, description: 'card id' })
  @IsNumber()
  card_id: number;

  @ApiProperty({ example: 1, description: 'customer card id' })
  @IsNumber()
  customer_card_id: number;

  @ApiProperty({ example: true, description: 'payment type' })
  @IsBoolean()
  payment_type: boolean;

  @ApiProperty({ example: '2023-11-12', description: 'payment date' })
  @IsString()
  payment_date: string;

  @ApiProperty({ example: 100.5, description: 'total price' })
  @IsNumber()
  total_price: number;

  @ApiProperty({ example: true, description: 'payment status' })
  @IsBoolean()
  status: boolean;
}
