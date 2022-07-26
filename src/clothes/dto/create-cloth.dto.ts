import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { FileEntity } from "src/files/entities/file.entity";
import { Store } from "src/stores/entities/store.entity";
import { Style } from "src/styles/entities/style.entity";

export class CreateClothDto {
  @ApiProperty({ type: () => Store })
  @IsOptional()
  store?: Store;

  @ApiProperty({ type: () => FileEntity })
  @IsNotEmpty()
  thumbnail: FileEntity;

  @ApiProperty({ type: () => Style })
  @IsNotEmpty()
  styles: Style[];
}
