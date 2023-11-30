import { PartialType } from '@nestjs/mapped-types';
import { CreateLikedProductDto } from './create-liked_product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLikedProductDto extends PartialType(CreateLikedProductDto) {
    @ApiProperty({
        example: 1,
      })
      @IsOptional()
      @IsNumber()
      product_id?: number;
    
      @ApiProperty({
        example: 1,
      })
      @IsOptional()
      @IsNumber()
      customer_id?: number;
}
