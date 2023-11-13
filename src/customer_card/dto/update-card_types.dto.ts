import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerCardDto } from './create-customer_card.dto';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {
  @ApiProperty({
    example: 1,
    description: 'customer_id',
  })
  @IsNumber()
  @IsOptional()
  customer_id?: number;

  @ApiProperty({
    example: 123456789,
    description: 'card_number',
  })
  @IsNumber()
  @IsOptional()
  card_number?: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'cardholder_name',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cardholder_name?: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'expiration_date',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  expiration_date?: string;

  @ApiProperty({
    example: 1,
    description: 'card_type_id',
  })
  @IsNumber()
  @IsOptional()
  card_type_id?: number;

  @ApiProperty({
    example: '2023-11-12',
    description: 'last_used',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_used?: string;
}
