import { PartialType } from '@nestjs/swagger';
import { CreateCustomerLocationDto } from './create-customer_location.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateCustomerLocationDto extends PartialType(
  CreateCustomerLocationDto,
) {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNumber()
  @IsOptional()
  customer_id?: number;

  @ApiProperty({ example: 1, description: 'region id' })
  @IsNumber()
  @IsOptional()
  region_id?: number;

  // @ApiProperty({ example: 1.0, description: 'latitude of customer location' })
  // @IsNumber()
  // latitude: number;

  // @ApiProperty({ example: 1.0, description: 'longitude of customer location' })
  // @IsNumber()
  // longitude: number;

  @ApiProperty({
    example: 'Customer location details',
    description: 'details of customer location',
  })
  @IsOptional()
  @IsString()
  details?: string;
}
