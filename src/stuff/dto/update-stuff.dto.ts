import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStuffDto } from './create-stuff.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStuffDto extends PartialType(CreateStuffDto) {
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

  @ApiProperty({
    example: 'hash64:fjenejkvneorke',
    description: 'hashed refresh token',
  })
  @IsNotEmpty()
  @IsString()
  hashed_refresh_token: string;

  @ApiProperty({ example: 'admin', description: 'role' })
  @IsNotEmpty()
  @IsString()
  role: string;
}
