import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginStuffDto {
  @ApiProperty({ example: 'john01@gmail.com', description: 'Stuff email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'Stuff password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
