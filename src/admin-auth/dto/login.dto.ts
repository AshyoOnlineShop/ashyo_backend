import { isEmpty } from 'rxjs';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qwerty',
    description: 'Foydalanuvchi paroli',
  })
  @IsString()
  @IsNotEmpty()
  hashed_password: string;
}
