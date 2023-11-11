import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John', description: 'Customer first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Green', description: 'Customer last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Customer image' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Customer email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'Customer password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: '12345', description: 'Customer confirm password' })
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Customer phone number',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ example: 'false', description: 'Is customer active' })
  is_active: boolean;
}
