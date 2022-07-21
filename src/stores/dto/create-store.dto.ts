import { IsMilitaryTime, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUrl, Validate } from "class-validator";
import { Address } from "src/addresses/entities/address.entity";
import { IsNotExist } from "src/utils/validators/is-not-exists.validator";
import { Style } from "../../styles/entities/style.entity";
import { User } from "../../users/entities/user.entity";

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Store', 'name'], {
    message: 'nameAlreadyExists',
  })
  name: string;

  @IsOptional()
  author?: User;

  @IsNotEmpty()
  styles: Style[];

  @IsOptional()
  addresses?: Address[] | number[];

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
