import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateImgDto {
  @ApiProperty({
    example: 1,
    description: 'product id',
  })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
