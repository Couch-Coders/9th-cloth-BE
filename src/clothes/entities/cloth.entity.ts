import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { FileEntity } from 'src/files/entities/file.entity';
import { Style } from 'src/styles/entities/style.entity';
import { Store } from 'src/stores/entities/store.entity';

@Entity()
export class Cloth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Store, (store) => store.clothes)
  store?: Store

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  thumbnail?: FileEntity;

  @ManyToMany(() => Style, (styles) => styles.id, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'clothes_styles',
    joinColumns: [{ name: 'cloth_id' }],
    inverseJoinColumns: [{ name: 'style_id' }],
  })
  styles?: Style[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}