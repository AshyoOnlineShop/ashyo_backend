import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductInfoDto {
  @ApiProperty({ example: 1, description: 'Product id' })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({ example: 1, description: 'Attribute id' })
  @IsNotEmpty()
  @IsNumber()
  attribute_id: number;

  @ApiProperty({ example: '8GB', description: 'Attribute value' })
  @IsNotEmpty()
  @IsString()
  attribute_value: string;

  @ApiProperty({ example: true, description: 'Show in main' })
  @IsNotEmpty()
  @IsBoolean()
  show_in_main: boolean;
}
