import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductMediaDto } from './create-product_media.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProductMediaDto extends PartialType(CreateProductMediaDto) {
  @ApiProperty({ example: 1, description: 'product id' })
  // @IsOptional()
  // @IsNumber()
  product_id?: number;

  @ApiProperty({
    example: './img/photo1.jpeg',
    description: 'product media url',
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({ example: 'video', description: 'product media type' })
  @IsOptional()
  @IsString()
  type?: string;
}
