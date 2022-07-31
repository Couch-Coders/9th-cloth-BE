import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Store } from 'src/stores/entities/store.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateAddressDto {
  @IsOptional()
  store?: Store;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zonecode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roadAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jibunAddress: string;

  @ApiProperty({ type: 'latitude' })
  @IsLatitude()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Address', 'latitude'], {
    message: 'latitudeAlreadyExists',
  })
  latitude: number;

  @ApiProperty({ type: 'longitude' })
  @IsLongitude()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Address', 'longitude'], {
    message: 'longitudeAlreadyExists',
  })
  longitude: number;
}
