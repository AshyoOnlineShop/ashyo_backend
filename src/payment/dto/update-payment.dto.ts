import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ example: 1, description: 'card id' })
  @IsNumber()
  cart_id?: number;

  @ApiProperty({ example: 1, description: 'customer card id' })
  @IsNumber()
  customer_card_id?: number;

  @ApiProperty({ example: true, description: 'payment type' })
  @IsBoolean()
  payment_type?: boolean;

  @ApiProperty({ example: '2023-11-12', description: 'payment date' })
  @IsDate()
  payment_date?: Date;

  @ApiProperty({ example: 100.5, description: 'total price' })
  @IsNumber()
  total_price?: number;

  @ApiProperty({ example: true, description: 'payment status' })
  @IsBoolean()
  status?: boolean;
}
