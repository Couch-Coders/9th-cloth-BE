import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  name: string;

  @ManyToOne(() => User, (users) => users.store)
  author?: User;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  openTime: string;

  @Column({ nullable: true })
  closeTime: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
