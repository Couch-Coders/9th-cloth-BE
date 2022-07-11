import { PartialType } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsOptional, IsString } from 'class-validator';
import { Store } from 'src/stores/entities/store.entity';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  store?: Store;

  @IsString()
  @IsOptional()
  zipCode: string;
  
  @IsString()
  @IsOptional()
  address1: string;

  @IsString()
  @IsOptional()
  address2: string;

  @IsLatitude()
  @IsOptional()
  latitude: number;

  @IsLongitude()
  @IsOptional()
  longitude: number;
}
