import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    example: 'Tashkent',
    description: 'region name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
