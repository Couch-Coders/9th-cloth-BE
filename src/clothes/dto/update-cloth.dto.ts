import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Style } from 'src/styles/entities/style.entity';
import { CreateClothDto } from './create-cloth.dto';

export class UpdateClothDto extends PartialType(CreateClothDto) {
  @ApiProperty({ type: () => Store })
  @IsOptional()
  store?: Store;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  thumbnail?: FileEntity;

  @ApiProperty({ type: () => Style })
  @IsOptional()
  styles?: Style[];
}
