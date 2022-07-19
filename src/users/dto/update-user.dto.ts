import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Style } from '../../styles/entities/style.entity';
import { Store } from '../../stores/entities/store.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsOptional()
  username: string;

  @IsOptional()
  store?: Store;

  @IsOptional()
  styles?: Style[];

  @IsOptional()
  picture: string;
  
  @IsOptional()
  isSeller?: boolean;

  @IsOptional()
  socialId: string;
}
