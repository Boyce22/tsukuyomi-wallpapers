import { Repository } from 'typeorm';
import { Role } from '@role/domain/models/role';
import { UserRole } from '@users/domain/models/user-role';
import { IUserRoleRepository } from '@users/types/user.types';
import AppDataSource from '@shared/infrastructure/config/database';

class UserRoleRepository implements IUserRoleRepository {
  private repository: Repository<UserRole>;
  private roleRepository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserRole);
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async associate(userId: string, roleName: string): Promise<void> {
    const role = await this.roleRepository.findOneBy({ name: roleName });

    if (!role) {
      throw new Error(`Role '${roleName}' not found`);
    }

    const exists = await this.repository.findOneBy({ userId, roleId: role.id });

    if (exists) return;

    await this.repository.insert({ userId, roleId: role.id });
  }
}

export default UserRoleRepository;
