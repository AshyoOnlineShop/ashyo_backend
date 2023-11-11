import { PartialType } from '@nestjs/swagger';
import { CreateCustomerLocationDto } from './create-customer_location.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCustomerLocationDto extends PartialType(
  CreateCustomerLocationDto,
) {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNumber()
  customer_id: number;

  @ApiProperty({
    example: 'Customer location details',
    description: 'details of customer location',
  })
  @IsString()
  details: string;
}
