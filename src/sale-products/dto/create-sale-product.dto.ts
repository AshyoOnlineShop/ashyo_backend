import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, } from 'class-validator';

export class CreateSaleProductDto {
  @ApiProperty({ example: 1, description: 'Product model id' })
  @IsNotEmpty()
  @IsNumber()
  product_model_id: number;

  @ApiProperty({ example: 44, description: 'Sale precentage' })
  @IsNotEmpty()
  @IsNumber()
  sale_precentage: number;

  @ApiProperty({ example: '11/11/2023', description: 'Sale start date' })
  @IsNotEmpty()
  sale_start_date: Date;

  @ApiProperty({ example: '11/11/2023', description: 'Sale end date' })
  @IsNotEmpty()
  sale_end_date: Date;

  @ApiProperty({ example: false, description: 'Status' })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
