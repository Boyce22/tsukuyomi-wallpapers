import { Repository } from 'typeorm';
import { Role } from '@role/domain/models/role';
import { IRoleRepository } from '@role/types/role.types';
import AppDataSource from '@shared/infrastructure/config/database';

class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }
  async findByName(name: string): Promise<Role | null> {
    return await this.repository.findOneBy({ name });
  }
}
