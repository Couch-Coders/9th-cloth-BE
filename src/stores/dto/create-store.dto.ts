import { ApiProperty } from '@nestjs/swagger';
import {
  IsMilitaryTime,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { Address } from 'src/addresses/entities/address.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Style } from '../../styles/entities/style.entity';
import { User } from '../../users/entities/user.entity';

export class CreateStoreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Store', 'name'], {
    message: 'nameAlreadyExists',
  })
  name: string;

  @ApiProperty({ type: () => User })
  @IsOptional()
  author?: User;

  @ApiProperty({ type: () => Style })
  @IsNotEmpty()
  styles: Style[];

  @ApiProperty({ type: () => Address })
  @IsOptional()
  addresses?: Address[] | number[];

  @ApiProperty()
  @IsOptional()
  thumbnails: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsMilitaryTime()
  openTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMilitaryTime()
  closeTime: string;

  @ApiProperty()
  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  contents: string;
}
