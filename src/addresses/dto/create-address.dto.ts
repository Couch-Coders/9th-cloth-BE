import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Store } from "src/stores/entities/store.entity";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
  longitude: number;
}
