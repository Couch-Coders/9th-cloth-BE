import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Style } from '../../styles/entities/style.entity';
import { Store } from '../../stores/entities/store.entity';

export class CreateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  username: string;

  @IsOptional()
  store?: Store;

  @IsOptional()
  styles?: Style[];

  profile: string;
  
  @IsOptional()
  isSeller?: boolean;

  @IsOptional()
  socialId: string;
}
