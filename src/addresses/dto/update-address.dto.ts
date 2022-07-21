import { PartialType } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { Store } from 'src/stores/entities/store.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsOptional()
  store?: Store;

  @IsString()
  @IsOptional()
  zonecode?: string;
  
  @IsString()
  @IsOptional()
  roadAddress?: string;

  @IsString()
  @IsOptional()
  jibunAddress?: string;

  @IsLatitude()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Address', 'latitude'], {
    message: 'latitudeAlreadyExists',
  })
  latitude?: number;

  @IsLongitude()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Address', 'longitude'], {
    message: 'longitudeAlreadyExists',
  })
  longitude?: number;
}
