import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsUrl, Validate } from 'class-validator';
import { Style } from '../../styles/entities/style.entity';
import { Store } from '../../stores/entities/store.entity';
import { CreateUserDto } from './create-user.dto';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  @Validate(IsNotExist, ['User', 'email'], {
    message: 'emailAlreadyExists',
  })
  email?: string;

  @ApiProperty()
  @IsOptional()
  @Validate(IsNotExist, ['User', 'username'], {
    message: 'usernameAlreadyExists',
  })
  username?: string;

  @ApiProperty({ type: () => Store })
  @IsOptional()
  store?: Store;

  @ApiProperty({ type: () => Style })
  @IsOptional()
  styles?: Style[];

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  picture?: string;

  @ApiProperty()
  @IsOptional()
  isSeller?: boolean;

  @IsOptional()
  @Validate(IsNotExist, ['User', 'socialId'], {
    message: 'socialIdAlreadyExists',
  })
  socialId?: string;
}
