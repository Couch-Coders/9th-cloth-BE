import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsUrl, Validate } from 'class-validator';
import { Style } from '../../styles/entities/style.entity';
import { Store } from '../../stores/entities/store.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User', 'email'], {
    message: 'emailAlreadyExists',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['User', 'username'], {
    message: 'usernameAlreadyExists',
  })
  username: string;

  @ApiProperty({ type: () => Store })
  @IsOptional()
  store?: Store;

  @ApiProperty({ type: () => Style })
  @IsOptional()
  styles?: Style[];

  @ApiProperty()
  @IsUrl()
  picture: string;

  @ApiProperty()
  @IsOptional()
  isSeller?: boolean;

  @IsOptional()
  @Validate(IsNotExist, ['User', 'socialId'], {
    message: 'socialIdAlreadyExists',
  })
  socialId: string;
}
