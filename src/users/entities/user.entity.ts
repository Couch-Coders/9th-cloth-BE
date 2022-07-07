import { Store } from "../../stores/entities/store.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Style } from "src/styles/entities/style.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @OneToMany(() => Store, (store) => store.author)
  store?: Store;

  @ManyToMany(() => Style, (styles) => styles.id)
  @JoinTable({
    joinColumns:[{name: "user_id"}],
    inverseJoinColumns:[{name: "style_id"}],
  })
  styles?: Style[];

  @Column({ nullable: true })
  profile: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  isSeller: boolean;

  @Column({ nullable: true })
  socialId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
