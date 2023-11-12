import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, IsOptional } from 'class-validator';
import { CreateStuffDto } from './create-stuff.dto';

export class UpdateStuffDto extends PartialType(CreateStuffDto) {
  @ApiProperty({ example: 'Mary', description: 'Stuff first name' })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({ example: 'Hale', description: 'Stuff last name' })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Stuff image' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Stuff email' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '12345', description: 'Stuff password' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 'superadmin', description: 'Stuff role' })
  @IsOptional()
  @IsString()
  role: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Stuff phone number',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone_number?: string;

  @ApiProperty({ example: 'false', description: 'Is stuff active' })
  @IsOptional()
  is_active?: boolean;
}
