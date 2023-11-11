import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCustomerActivenessDto {
  @ApiProperty({ example: 'false', description: 'Update customer activeness' })
  @IsOptional()
  is_active?: boolean;
}
