import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateCustomerLocationDto {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({
    example: 'Customer location details',
    description: 'details of customer location',
  })
  @IsString()
  @IsNotEmpty()
  details: string;
}
