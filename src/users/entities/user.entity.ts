import { Store } from '../../stores/entities/store.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Style } from 'src/styles/entities/style.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  username: string;

  @OneToMany(() => Store, (stores) => stores.author, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  stores?: Store[];

  @ManyToMany(() => Style, (styles) => styles.id, {
    eager: true,
  })
  @JoinTable({
    name: 'users_styles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'style_id' }],
  })
  styles?: Style[];

  @ApiProperty()
  @Column({ nullable: true })
  picture: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false, nullable: true })
  isSeller: boolean;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  socialId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
