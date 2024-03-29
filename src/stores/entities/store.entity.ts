import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/addresses/entities/address.entity';
import { Cloth } from 'src/clothes/entities/cloth.entity';
import { FileEntity } from 'src/files/entities/file.entity';
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
    name: 'stores_styles',
    joinColumns: [{ name: 'store_id' }],
    inverseJoinColumns: [{ name: 'style_id' }],
  })
  styles?: Style[];

  @ApiProperty()
  @ManyToMany(() => FileEntity, (files) => files.id, {
    eager: true,
  })
  @JoinTable({
    name: 'stores_files',
    joinColumns: [{ name: 'store_id' }],
    inverseJoinColumns: [{ name: 'file_id' }]
  })
  thumbnails: FileEntity[];

  @OneToMany(() => Cloth, (clothes) => clothes.store)
  clothes?: Cloth[];

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
