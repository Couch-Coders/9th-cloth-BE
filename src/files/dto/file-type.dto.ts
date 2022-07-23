import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { FileTypeEnum } from "../file-type.enum";

export class FileTypeDto {
  @ApiProperty({ enum: FileTypeEnum })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEnum(FileTypeEnum)
  @IsNotEmpty()
  type: FileTypeEnum;
}