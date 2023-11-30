import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductInfoDto {
  @ApiProperty({ example: 1, description: 'Product id' })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({ example: 1, description: 'Attribute id' })
  @IsNotEmpty()
  @IsNumber()
  attribute_id: number;
}
