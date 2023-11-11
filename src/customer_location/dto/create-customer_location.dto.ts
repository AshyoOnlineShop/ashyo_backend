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

  // @ApiProperty({ example: 1.0, description: 'latitude of customer location' })
  // @IsNumber()
  // @IsNotEmpty()
  // latitude: number;

  // @ApiProperty({ example: 1.0, description: 'longitude of customer location' })
  // @IsNumber()
  // @IsNotEmpty()
  // longitude: number;


  @ApiProperty({
    example: 'Customer location details',
    description: 'details of customer location',
  })
  @IsString()
  @IsNotEmpty()
  details: string;
}
