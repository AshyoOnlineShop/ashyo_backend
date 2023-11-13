import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';

export class CreateAttributeGroupDto {
  @ApiProperty({ example: 'Memory', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Category id' })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @ApiProperty({ example: 1, description: 'Position' })
  @IsNotEmpty()
  @IsNumber()
  position: number;
}
