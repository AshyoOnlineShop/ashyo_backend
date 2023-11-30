import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductModelDto {
  @ApiProperty({
    example: 'Iphone 15 pro max',
    description: 'product model name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'brand category id' })
  @IsNotEmpty()
  @IsNumber()
  brand_category_id: number;
}
