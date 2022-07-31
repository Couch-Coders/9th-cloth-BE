import { Store } from '../../stores/entities/store.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Address extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Store, (store) => store.addresses, {
    onDelete: 'CASCADE',
  })
  store?: Store;

  @ApiProperty()
  @Column({ nullable: true })
  zonecode: string;

  @ApiProperty()
  @Column({ nullable: true })
  roadAddress: string;

  @ApiProperty()
  @Column({ nullable: true })
  jibunAddress: string;

  // https://apis.map.kakao.com/web/documentation/#services_Geocoder_addressSearch
  @ApiProperty({ type: 'latitude' })
  @Column({ type: 'float', unique: true, nullable: true })
  latitude: number;

  @ApiProperty({ type: 'longitude' })
  @Column({ type: 'float', unique: true, nullable: true })
  longitude: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
