import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAttributeDto {
  @ApiProperty({ example: 'Memory', description: 'Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1, description: 'Attribute group id' })
  @IsNumber()
  @IsOptional()
  attribute_group_id?: number;

  @ApiProperty({ example: 1, description: 'Position' })
  @IsNumber()
  @IsOptional()
  position?: number;
}
