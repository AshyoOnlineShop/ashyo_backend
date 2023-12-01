import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Phones', description: 'Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1, description: 'Position' })
  // @IsNumber()
  @IsOptional()
  position?: number;

  @ApiProperty({ example: 'img.png', description: 'Image' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 1, description: 'Parent category id' })
  // @IsNumber()
  @IsOptional()
  parent_category_id?: number;
}
