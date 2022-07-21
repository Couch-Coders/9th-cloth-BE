import { PartialType } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUrl, Validate } from 'class-validator';
import { Address } from 'src/addresses/entities/address.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Style } from '../../styles/entities/style.entity';
import { User } from '../../users/entities/user.entity';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsString()
  @IsOptional()
  @Validate(IsNotExist, ['Store', 'name'])
  name: string;

  @IsOptional()
  author?: User;

  @IsOptional()
  styles?: Style[];

  @IsOptional()
  addresses?: Address[] | number[];

  @IsUrl()
  @IsOptional()
  thumbnail: string;
  
  @IsOptional()
  openTime: string;

  @IsOptional()
  closeTime: string;

  @IsMobilePhone()
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  contents: string;
}
