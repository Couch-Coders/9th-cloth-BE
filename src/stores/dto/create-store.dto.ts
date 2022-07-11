import { IsMilitaryTime, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Style } from "../../styles/entities/style.entity";
import { User } from "../../users/entities/user.entity";

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  author?: User;

  @IsNotEmpty()
  styles: Style[];

  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;
  
  @IsNotEmpty()
  @IsMilitaryTime()
  openTime: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  closeTime: string;

  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  contents: string;
}
