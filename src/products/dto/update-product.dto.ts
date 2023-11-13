import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'headphone', description: 'product name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'great headphone',
    description: 'product description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 235000, description: 'product price' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 1, description: 'category id' })
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @ApiProperty({ example: 1, description: 'model id' })
  @IsOptional()
  @IsNumber()
  model_id?: number;

  @ApiProperty({ example: 1, description: 'brand id' })
  @IsOptional()
  @IsNumber()
  brand_id?: number;

  @ApiProperty({ example: 100, description: 'product quantity' })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
