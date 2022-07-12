import { Store } from "../../stores/entities/store.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Store, (store) => store.addresses)
  store?: Store;

  @Column({ nullable: true })
  zonecode: string;

  @Column({ nullable: true })
  roadAddress: string;

  @Column({ nullable: true })
  jibunAddress: string;

  // https://apis.map.kakao.com/web/documentation/#services_Geocoder_addressSearch
  @Column({ type: 'float',unique: true, nullable: true })
  latitude: number;

  @Column({ type: 'float', unique: true, nullable: true })
  longitude: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
