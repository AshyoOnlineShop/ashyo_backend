import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDistrictDto } from './create-district.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
  @ApiProperty({
    example: 'Samarqand',
    description: 'district updated name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 1,
    description: 'region updated id',
  })
  @IsNumber()
  @IsOptional()
  region_id?: number;
}
