import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
} from 'class-validator';
import { StyleEnum } from 'src/styles/styles.enum';

export class StyleFilterDto {
  @ApiProperty({ enum: StyleEnum })
  @IsOptional()
  @IsEnum(StyleEnum)
  style?: string;
}
