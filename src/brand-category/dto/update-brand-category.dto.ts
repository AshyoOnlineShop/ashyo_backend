import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, } from 'class-validator';

export class UpdateBrandCategoryDto {
  @ApiProperty({ example: 1, description: 'Brand id' })
  @IsNotEmpty()
  @IsNumber()
  brand_id: number;

  @ApiProperty({ example: 1, description: 'Category id' })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}
