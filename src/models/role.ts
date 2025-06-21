import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Identificador único da role, gerado automaticamente.',
  })
  id!: string;

  @Column({
    unique: true,
    length: 50,
    comment: 'Nome único da role que identifica o conjunto de permissões (máx. 50 caracteres).',
  })
  name!: string;

  @Column({
    comment: 'Indica se a role está ativa e pode ser atribuída a usuários.',
    default: true,
  })
  isActive!: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
