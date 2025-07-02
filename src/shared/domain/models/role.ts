import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../users/domain/models/user';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToMany(() => User, (user: User) => user.roles)
  users!: User[];
}
