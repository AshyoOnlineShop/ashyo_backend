import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'headphone', description: 'product name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'great headphone',
    description: 'product description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 235000, description: 'product price' })
  @IsNotEmpty()
  // @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'category id' })
  @IsNotEmpty()
  // @IsNumber()
  category_id: number;

  @ApiProperty({ example: 1, description: 'model id' })
  @IsNotEmpty()
  // @IsNumber()
  model_id: number;

  @ApiProperty({ example: 1, description: 'brand id' })
  @IsNotEmpty()
  // @IsNumber()
  brand_id: number;

  @ApiProperty({ example: 100, description: 'product quantity' })
  @IsNotEmpty()
  // @IsNumber()
  quantity: number;

  @ApiProperty({ example: 'img.png', description: 'product img' })
  @IsOptional()
  @IsString()
  image: string;
}
