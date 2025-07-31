import type { Role } from '@role/domain/models/role';

export interface IRoleRepository {
  findByName(name: string): Promise<Role | null>;
}
