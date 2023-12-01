import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommercialDto {
  @ApiProperty({ example: 1, description: 'product id' })
  @IsNotEmpty()
  // @IsNumber()
  product_id: number;

  @ApiProperty({ example: 'img.png', description: 'image' })
  @IsOptional()
  image: string;

  @ApiProperty({
    example: 'Siz kutgan Xiaomi 12 Mi Laite',
    description: 'commercial title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      "Orginallik va qulay narxni o'zida jamlagan  Xiaomi 12 Mi Laite  siz uchun eng yaxshi arziydigan takliflarimizdan biridir!ii",
    description: 'commercial description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
