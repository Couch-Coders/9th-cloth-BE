import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

@Entity()
export class Style extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @Allow()
  @ApiProperty({ example: 'minimalism' })
  @Column()
  name?: string;
}