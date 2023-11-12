import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeStuffPasswordDto {
  @ApiProperty({ example: '12345', description: 'Stuff old password' })
  @IsNotEmpty()
  @IsString()
  oldPassword?: string;

  @ApiProperty({ example: '54321', description: 'Stuff new password' })
  @IsNotEmpty()
  @IsString()
  newPassword?: string;
}
