import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, IsOptional } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty({ example: 'John', description: 'Customer first name' })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({ example: 'Green', description: 'Customer last name' })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Customer image' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Customer email' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '12345', description: 'Customer password' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '12345', description: 'Customer confirm password' })
  @IsOptional()
  confirm_password?: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Customer phone number',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone_number?: string;

  @ApiProperty({ example: 'false', description: 'Is customer active' })
  @IsOptional()
  is_active?: boolean;
}
