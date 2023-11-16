import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateHistoryDto {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({ example: 1, description: 'order id' })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ example: '2023-11-12', description: 'delivered date' })
  @IsDate()
  @IsNotEmpty()
  delivered_date: Date;

}
