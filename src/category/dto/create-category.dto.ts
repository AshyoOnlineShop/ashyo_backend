import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Phones', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Position' })
  @IsNotEmpty()
  @IsNumber()
  position: number;

  @ApiProperty({ example: 'img.png', description: 'Image' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 1, description: 'Parent category id' })
  @IsNotEmpty()
  @IsNumber()
  parent_category_id: number;
}
