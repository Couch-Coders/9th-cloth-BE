import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
  Validate,
} from 'class-validator';
import { Address } from 'src/addresses/entities/address.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Style } from '../../styles/entities/style.entity';
import { User } from '../../users/entities/user.entity';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Validate(IsNotExist, ['Store', 'name'])
  name: string;

  @ApiProperty({ type: () => User })
  @IsOptional()
  author?: User;

  @ApiProperty({ type: () => Style })
  @IsOptional()
  styles?: Style[];

  @ApiProperty({ type: () => Address })
  @IsOptional()
  addresses?: Address[] | number[];

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  thumbnail: string;

  @ApiProperty()
  @IsOptional()
  openTime: string;

  @ApiProperty()
  @IsOptional()
  closeTime: string;

  @ApiProperty()
  @IsMobilePhone()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  contents: string;
}
