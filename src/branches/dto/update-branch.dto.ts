import { PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {

  @ApiProperty({ example: 1, description: 'branch region id' })
  @IsNumber()
  @IsOptional()
  region_id?: number;

  // @IsNumber()
  // longitude: number;

  // @ApiProperty({ example: 7878, description: 'latitude of branch' })
  // @IsNumber()
  // latitude: number;

  @ApiProperty({
    example: 'Amir Temur street, home 8',
    description: 'details of branch location',
  })
  @IsString()
  @IsOptional()
  details?: string;

  @ApiProperty({ example: '+998991234567', description: 'branch phone number' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'email of branch' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 1, description: 'about shop id' })
  @IsNumber()
  @IsOptional()
  about_shop_id?: number;
}
