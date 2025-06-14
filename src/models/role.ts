import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];

  @Column()
  isActive!: boolean;
}
