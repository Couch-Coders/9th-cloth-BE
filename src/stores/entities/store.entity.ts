import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/addresses/entities/address.entity';
import { Style } from 'src/styles/entities/style.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Store extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  name: string;

  @ManyToOne(() => User, (user) => user.stores, {
    onDelete: 'SET NULL',
  })
  author?: User;

  @OneToMany(() => Address, (addresses) => addresses.store, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  addresses?: Address[];

  @ManyToMany(() => Style, (styles) => styles.id, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    joinColumns: [{ name: 'store_id' }],
    inverseJoinColumns: [{ name: 'style_id' }],
  })
  styles?: Style[];

  @ApiProperty()
  @Column({ nullable: true })
  thumbnail: string;

  @ApiProperty()
  @Column({ nullable: true })
  openTime: string;

  @ApiProperty()
  @Column({ nullable: true })
  closeTime: string;

  @ApiProperty()
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
