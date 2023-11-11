import { PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsLatitude, IsLongitude } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {

  @ApiProperty({ example: 1, description: 'branch region id' })
  @IsNumber()
  region_id?: number;

  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 7878, description: 'latitude of branch' })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: 'Amir Temur street, home 8',
    description: 'details of branch location',
  })
  @IsString()
  details?: string;

  @ApiProperty({ example: '+998991234567', description: 'branch phone number' })
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'email of branch' })
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 1, description: 'about shop id' })
  @IsNumber()
  about_shop_id?: number;
}
