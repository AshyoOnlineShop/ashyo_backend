import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductBranchDto {
  @ApiProperty({ example: 1, description: "product's id" })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 1, description: "branch's id" })
  @IsNumber()
  @IsNotEmpty()
  branch_id: number;
}
