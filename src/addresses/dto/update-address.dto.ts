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
  zonecode: string;
  
  @IsString()
  @IsOptional()
  roadAddress: string;

  @IsString()
  @IsOptional()
  jibunAddress: string;

  @IsLatitude()
  @IsOptional()
  latitude: number;

  @IsLongitude()
  @IsOptional()
  longitude: number;
}
