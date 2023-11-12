import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';

export class UpdateAttributeDto {
  @ApiProperty({ example: 'Memory', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Attribute group id' })
  @IsNotEmpty()
  @IsNumber()
  attribute_group_id: number;

  @ApiProperty({ example: 1, description: 'Position' })
  @IsNotEmpty()
  @IsNumber()
  position: number;
}
