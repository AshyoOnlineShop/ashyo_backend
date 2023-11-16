import { PartialType } from '@nestjs/mapped-types';
import { CreateViewedProductDto } from './create-viewed_product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateViewedProductDto extends PartialType(
  CreateViewedProductDto,
) {
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

  @ApiProperty({
    example: "ko'rildi",
  })
  @IsOptional()
  @IsDate()
  viewed_at?: Date;
}
