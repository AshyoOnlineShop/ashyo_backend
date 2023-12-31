import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({
    example: 'tashkent1',
    description: 'district name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'region id',
  })
  @IsNumber()
  @IsNotEmpty()
  region_id: number;
}
