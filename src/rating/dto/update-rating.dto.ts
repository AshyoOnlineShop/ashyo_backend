import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-rating.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
}
