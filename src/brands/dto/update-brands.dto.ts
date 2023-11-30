import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { CreateBrandDto } from './create-brands.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiProperty({ example: 'Apple', description: 'brand name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: './img/photo.jpeg', description: 'brand image' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 1, description: 'image position' })
  @IsOptional()
  @IsNumber()
  position?: number;
}
