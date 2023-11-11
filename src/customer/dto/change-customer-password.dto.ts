import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeCustomerPasswordDto {
  @ApiProperty({ example: '12345', description: 'Customer old password' })
  @IsNotEmpty()
  @IsString()
  oldPassword?: string;

  @ApiProperty({ example: '54321', description: 'Customer new password' })
  @IsNotEmpty()
  @IsString()
  newPassword?: string;
}
