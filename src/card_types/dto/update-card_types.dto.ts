import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCard_typesDto } from './create-card_types.dto';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateCard_typesDto extends PartialType(CreateCard_typesDto) {
  @ApiProperty({
    example: "humo",
    description: 'update card_types name',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'tashkent',
    description: 'update card_types name',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'image_url',
    description: 'update card_types image url',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: 1,
    description: 'update card_types position',
  })
  @IsOptional()
  position?: number;
}
