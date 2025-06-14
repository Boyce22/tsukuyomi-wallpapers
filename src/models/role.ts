import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid', { comment: 'Identificador único da role, gerado automaticamente.' })
  id!: string;

  @Column({ unique: true, comment: 'Nome único da role que identifica o conjunto de permissões.' })
  name!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];

  @Column({ comment: 'Indica se a role está ativa e pode ser atribuída a usuários.' })
  isActive!: boolean;
}
