import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCustomerCardDto {
  @ApiProperty({
    example: 1,
    description: 'customer_id',
  })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({
    example: 123456789,
    description: 'card_number',
  })
  @IsNumber()
  @IsNotEmpty()
  card_number: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'cardholder_name',
  })
  @IsString()
  @IsNotEmpty()
  cardholder_name: string;

  @ApiProperty({ example: '01/23', description: 'Expiration Date' })
  @IsString()
  @IsNotEmpty()
  expiration_date: string;

  @ApiProperty({
    example: 1,
    description: 'card_type_id',
  })
  @IsNumber()
  @IsNotEmpty()
  card_type_id: number;

  @ApiProperty({
    example: '2023-11-12',
    description: 'last_used',
  })
  @IsString()
  @IsNotEmpty()
  last_used: string;
}
