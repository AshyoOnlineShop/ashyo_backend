import { PartialType } from '@nestjs/swagger';
import { CreateProductBranchDto } from './create-product_branch.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductBranchDto extends PartialType(
  CreateProductBranchDto,
) {
  @ApiProperty({ example: 1, description: "product id" })
  @IsNumber()
  @IsOptional()
  product_id?: number;

  @ApiProperty({ example: 1, description: "branch id" })
  @IsNumber()
  @IsOptional()
  branch_id?: number;
}
