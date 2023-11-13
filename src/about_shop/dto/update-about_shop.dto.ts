import { PartialType } from '@nestjs/swagger';
import { CreateAboutShopDto } from './create-about_shop.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsUrl, IsOptional } from 'class-validator';

export class UpdateAboutShopDto extends PartialType(CreateAboutShopDto) {
  @ApiProperty({ example: '+998991234567', description: 'main phone number' })
  @IsString()
  @IsOptional()
  main_phone?: string;

  @ApiProperty({ example: 'example@mail.uz', description: 'shop email' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'This shop sells food',
    description: 'shop description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://instagram.com/',
    description: 'shop Instagram link',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  insta_link?: string;

  @ApiProperty({
    example: 'https://telegram.com/',
    description: 'shop Telegram link',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  telegram_link?: string;

  @ApiProperty({
    example: 'https://facebook.com/',
    description: 'shop Facebook link',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  facebook_link?: string;

  @ApiProperty({
    example: 'https://youtube.com/',
    description: 'shop YouTube link',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  youtube_link?: string;

  @ApiProperty({
    example: 'https://twitter.com/',
    description: 'shop Twitter link',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  twitter_link?: string;
}
