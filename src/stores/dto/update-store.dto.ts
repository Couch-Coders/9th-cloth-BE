import { PartialType } from '@nestjs/swagger';
import { IsMobilePhone, IsOptional, IsString, IsUrl } from 'class-validator';
import { Style } from '../../styles/entities/style.entity';
import { User } from '../../users/entities/user.entity';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  author?: User;

  @IsOptional()
  styles?: Style[];

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
