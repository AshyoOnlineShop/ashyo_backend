import { PartialType } from '@nestjs/swagger';
import { CreateHistoryDto } from './create-history.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsOptional()
  @IsNumber()
  customer_id?: number;

  @ApiProperty({ example: 1, description: 'order id' })
  @IsOptional()
  @IsNumber()
  order_id?: number;

  @ApiProperty({ example: '2023-11-12', description: 'delivered date' })
  @IsOptional()
  @IsDate()
  delivered_date?: Date;
}
