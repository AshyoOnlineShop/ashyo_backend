import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommercialDto } from './create-commercial.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateCommercialDto extends PartialType(CreateCommercialDto) {
  @ApiProperty({ example: 1, description: 'product id' })
  @IsOptional()
  // @IsNumber()
  product_id?: number;

  @ApiProperty({ example: 'img.png', description: 'image' })
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: 'Siz kutgan Xiaomi 12 Mi Laite',
    description: 'commercial title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example:
      "Orginallik va qulay narxni o'zida jamlagan  Xiaomi 12 Mi Laite  siz uchun eng yaxshi arziydigan takliflarimizdan biridir!ii",
    description: 'commercial description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
