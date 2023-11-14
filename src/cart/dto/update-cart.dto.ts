import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsOptional()
  @IsNumber()
  customer_id: number;

  @ApiProperty({ example: 1, description: 'product id' })
  @IsOptional()
  @IsNumber()
  product_id: number;

  @ApiProperty({ example: 5, description: 'product quantity' })
  @IsOptional()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: false, description: 'product status' })
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
