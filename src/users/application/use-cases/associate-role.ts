import { IUserRoleRepository } from '@users/types/user.types';

export interface IAssociateRoleUseCase {
  execute(userId: string, roleName: string): Promise<void>;
}

export class AssociateRoleUseCase implements IAssociateRoleUseCase {
  private readonly userRoleRepository: IUserRoleRepository;

  constructor(userRoleRepository: IUserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(userId: string, roleName: string): Promise<void> {
    await this.userRoleRepository.associate(userId, roleName);
  }
}
