import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStuffDto {
  @ApiProperty({ example: 'John', description: 'first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'img.png', description: 'photo' })
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({ example: '+998909879898', description: 'phone number' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'johndooe@gmail.com', description: 'email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'hash64:fjenejkvneorke',
    description: 'hashed password',
  })
  @IsNotEmpty()
  @IsString()
  hashed_password: string;

  @ApiProperty({ example: 'hash64:fjenejkvneorke', description: 'hashed refresh token' })
  @IsNotEmpty()
  @IsString()
  hashed_refresh_token: string;

  @ApiProperty({ example: 'admin', description: 'role' })
  @IsNotEmpty()
  @IsString()
  role: string;
}
