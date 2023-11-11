import { PartialType } from '@nestjs/swagger';
import { CreateProductBranchDto } from './create-product_branch.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateProductBranchDto extends PartialType(
  CreateProductBranchDto,
) {
  @ApiProperty({ example: 1, description: "product's id" })
  @IsNumber()
  product_id: number;

  @ApiProperty({ example: 1, description: "branch's id" })
  @IsNumber()
  branch_id: number;
}
