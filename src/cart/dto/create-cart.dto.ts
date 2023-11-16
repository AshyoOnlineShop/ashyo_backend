import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'customer id' })
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @ApiProperty({ example: 1, description: 'product id' })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({ example: 5, description: 'product quantity' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: false, description: 'product status' })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
