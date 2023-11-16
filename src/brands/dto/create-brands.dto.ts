import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'Apple', description: 'brand name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: './img/photo.jpeg', description: 'brand image' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 1, description: 'image position' })
  @IsNumber()
  position: number;
}
