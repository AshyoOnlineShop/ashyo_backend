import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    example: 'Tashkente',
    description: 'region name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
