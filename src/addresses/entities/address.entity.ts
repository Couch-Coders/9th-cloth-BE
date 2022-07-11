import { Store } from "../../stores/entities/store.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @ManyToOne(() => Store, (store) => store.addresses)
  store?: Store;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column({ type: 'float',unique: true, nullable: true })
  latitude: number;

  @Column({ type: 'float', unique: true, nullable: true })
  longitude: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
