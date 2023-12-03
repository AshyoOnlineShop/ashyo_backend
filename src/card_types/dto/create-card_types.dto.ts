import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCard_typesDto {
  @ApiProperty({
    example: "humo",
    description: 'card_types name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'image_url',
    description: 'card_types image url',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: 'card_types description',
    description: 'card_types description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'card_types position',
  })
  @IsNotEmpty()
  position: number;
}
