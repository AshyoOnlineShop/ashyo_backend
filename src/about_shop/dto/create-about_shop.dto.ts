import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsUrl } from 'class-validator';

export class CreateAboutShopDto {
  @ApiProperty({ example: '+998991234567', description: 'main phone number' })
  @IsString()
  @IsNotEmpty()
  main_phone: string;

  @ApiProperty({ example: 'example@mail.uz', description: 'shop email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'This shop sells food', description: 'shop description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://instagram.com/', description: 'shop Instagram link' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  insta_link: string;

  @ApiProperty({ example: 'https://telegram.com/', description: 'shop Telegram link' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  telegram_link: string;

  @ApiProperty({ example: 'https://facebook.com/', description: 'shop Facebook link' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  facebook_link: string;

  @ApiProperty({ example: 'https://youtube.com/', description: 'shop YouTube link' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  youtube_link: string;

  @ApiProperty({ example: 'https://twitter.com/', description: 'shop Twitter link' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  twitter_link: string;
}
