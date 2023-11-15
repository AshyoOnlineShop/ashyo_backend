import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  customer_id?: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  product_id?: number;

  @ApiProperty({
    example: "zo'r",
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  reply_comment_id?: number;

  @ApiProperty({
    example: '2004-02-21',
  })
  @IsOptional()
  commented_at?: Date;
}
