import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Style } from '../../styles/entities/style.entity';
import { Store } from '../../stores/entities/store.entity';
import { CreateUserDto } from './create-user.dto';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  @Validate(IsNotExist, ['User', 'email'], {
    message: 'emailAlreadyExists',
  })
  email?: string;
  
  @IsOptional()
  @Validate(IsNotExist, ['User', 'username'], {
    message: 'usernameAlreadyExists',
  })
  username?: string;

  @IsOptional()
  store?: Store;

  @IsOptional()
  styles?: Style[];

  @IsOptional()
  picture?: string;
  
  @IsOptional()
  isSeller?: boolean;

  @IsOptional()
  @Validate(IsNotExist, ['User', 'socialId'], {
    message: 'socialIdAlreadyExists',
  })
  socialId?: string;
}
