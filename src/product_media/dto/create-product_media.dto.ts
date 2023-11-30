import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductMediaDto {
  @ApiProperty({ example: 1, description: 'product id' })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({
    example: './img/photo1.jpeg',
    description: 'product media url',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ example: 'video', description: 'product media type' })
  @IsNotEmpty()
  @IsString()
  type: string;
}
