import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDistrictDto } from './create-district.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
 
}
