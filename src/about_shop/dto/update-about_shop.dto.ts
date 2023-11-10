import { PartialType } from '@nestjs/swagger';
import { CreateAboutShopDto } from './create-about_shop.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsUrl } from 'class-validator';

export class UpdateAboutShopDto extends PartialType(CreateAboutShopDto) {
  @ApiProperty({ example: '+998991234567', description: 'main phone number' })
  @IsString()
  main_phone?: string;

  @ApiProperty({ example: 'example@mail.uz', description: 'shop email' })
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'This shop sells food',
    description: 'shop description',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://instagram.com/',
    description: 'shop Instagram link',
  })
  @IsString()
  @IsUrl()
  insta_link?: string;

  @ApiProperty({
    example: 'https://telegram.com/',
    description: 'shop Telegram link',
  })
  @IsString()
  @IsUrl()
  telegram_link?: string;

  @ApiProperty({
    example: 'https://facebook.com/',
    description: 'shop Facebook link',
  })
  @IsString()
  @IsUrl()
  facebook_link?: string;

  @ApiProperty({
    example: 'https://youtube.com/',
    description: 'shop YouTube link',
  })
  @IsString()
  @IsUrl()
  youtube_link?: string;

  @ApiProperty({
    example: 'https://twitter.com/',
    description: 'shop Twitter link',
  })
  @IsString()
  @IsUrl()
  twitter_link?: string;
}
