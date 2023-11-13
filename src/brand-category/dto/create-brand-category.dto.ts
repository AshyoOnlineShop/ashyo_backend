import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';

export class CreateBrandCategoryDto {
  @ApiProperty({ example: 1, description: 'Brand id' })
  @IsNotEmpty()
  @IsNumber()
  brand_id: number;

  @ApiProperty({ example: 1, description: 'Category id' })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}
