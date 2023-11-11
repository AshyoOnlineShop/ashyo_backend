import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerDto {
  @ApiProperty({ example: 'john01@gmail.com', description: 'Customer email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'Customer password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
