import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdminCustomerDto {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @ApiProperty({ example: 1, description: 'stuff id' })
  @IsNotEmpty()
  @IsNumber()
  admin_id: number;

  @ApiProperty({
    example: 'Are u planning to sale Iphone 15 in ur market?',
    description: 'customer message',
  })
  @IsString()
  customer_message: string;

  @ApiProperty({
    example: 'Yes, next week it will be on sale.',
    description: 'admin message',
  })
  @IsString()
  admin_message: string;

  @ApiProperty({
    example: 316,
    description: 'time in numbers',
  })
  @IsNotEmpty()
  @IsNumber()
  messaged_at: number;

}
