import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateStuffDto {
  @ApiProperty({ example: 'Lucy', description: 'Stuff first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Hale', description: 'Stuff last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Stuff image' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Stuff email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'Stuff password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: '12345', description: 'Stuff confirm password' })
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({ example: '2000/10/10', description: 'Stuff birthdate' })
  @IsNotEmpty()
  @IsString()
  birthdate: Date;

  @ApiProperty({ example: 'superadmin', description: 'Stuff role' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Stuff phone number',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ example: 'false', description: 'Is stuff active' })
  is_active: boolean;
}
