import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateStuffActivenessDto {
  @ApiProperty({ example: 'false', description: 'Update stuff activeness' })
  @IsOptional()
  is_active?: boolean;
}
