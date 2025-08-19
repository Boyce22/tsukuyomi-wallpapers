import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { User } from '@users/domain/models/user';
import { Role } from '@role/domain/models/role';

@Entity('user_role')
export class UserRole {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId!: string;

  @PrimaryColumn('uuid', { name: 'role_id' })
  roleId!: string;

  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Column({ type: 'timestamptz', default: () => 'now()', name: 'assigned_at' })
  assignedAt!: Date;
}
