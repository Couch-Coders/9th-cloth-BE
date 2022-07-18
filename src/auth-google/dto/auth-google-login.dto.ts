import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthGoogleLoginDto {
  @ApiProperty({ example: 'abc' })
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  scope: string;

  @IsNotEmpty()
  authuser: number;

  @IsNotEmpty()
  prompt: string;
}