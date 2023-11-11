import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({ example: 1, description: 'branch region id' })
  @IsNumber()
  @IsNotEmpty()
  region_id: number;

  @ApiProperty({
    example: 6776,
    description: 'longitude of branch',
  })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ example: 7878, description: 'latitude of branch' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    example: 'Amir Temur street, home 8',
    description: 'details of branch location',
  })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ example: '+998991234567', description: 'branch phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'email of branch' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 1, description: 'about shop id' })
  @IsNumber()
  @IsNotEmpty()
  about_shop_id: number;
}
