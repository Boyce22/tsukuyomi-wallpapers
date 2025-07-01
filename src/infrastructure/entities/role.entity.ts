import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users!: UserEntity[];
}
