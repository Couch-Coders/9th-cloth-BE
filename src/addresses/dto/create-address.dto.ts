import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, IsUrl, Validate } from "class-validator";
import { Store } from "src/stores/entities/store.entity";
import { IsNotExist } from "src/utils/validators/is-not-exists.validator";

export class CreateAddressDto {
  @IsOptional()
  store?: Store;

  @IsString()
  @IsNotEmpty()
  zonecode: string;
  
  @IsString()
  @IsNotEmpty()
  roadAddress: string;

  @IsString()
  @IsNotEmpty()
  jibunAddress: string;

  @IsLatitude()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Address', 'latitude'], {
    message: 'latitudeAlreadyExists',
  })
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Address', 'longitude'], {
    message: 'longitudeAlreadyExists',
  })
  longitude: number;
}
