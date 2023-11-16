import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductModelDto } from './create-product_model.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProductModelDto extends PartialType(CreateProductModelDto) {
  @ApiProperty({
    example: 'Iphone 15 pro max',
    description: 'product model name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 1, description: 'brand category id' })
  @IsOptional()
  @IsNumber()
  brand_category_id?: number;
}
