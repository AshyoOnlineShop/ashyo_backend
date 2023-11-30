import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminCustomerDto } from './create-admin_customer.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAdminCustomerDto extends PartialType(
  CreateAdminCustomerDto,
) {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsOptional()
  @IsNumber()
  customer_id?: number;

  @ApiProperty({ example: 1, description: 'stuff id' })
  @IsOptional()
  @IsNumber()
  admin_id?: number;

  @ApiProperty({
    example: 'Are u planning to sale Iphone 15 in ur market?',
    description: 'customer message',
  })
  @IsOptional()
  @IsString()
  customer_message?: string;

  @ApiProperty({
    example: 'Yes, next week it will be on sale.',
    description: 'admin message',
  })
  @IsOptional()
  @IsString()
  admin_message?: string;
}
