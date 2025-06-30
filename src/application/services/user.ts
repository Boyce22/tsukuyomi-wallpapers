import type { User } from '@/domain/models/user';

import { CreateUser, IUserRepository, IUserService } from '@/application/_types/users/user.types';
import { IHashProvider } from '@/application/_types/auth/auth.type';

class UserService implements IUserService {
  private readonly repository: IUserRepository;
  private readonly hashProvider: IHashProvider;

  constructor(
    repository: IUserRepository,
    hashProvider: IHashProvider,
  ) {
    this.repository = repository;
    this.hashProvider = hashProvider;
  }

  static createInstance(
    repository: IUserRepository,
    hashProvider: IHashProvider,
  ): UserService {
    return new UserService(repository, hashProvider);
  }

  async register(dto: CreateUser): Promise<User> {
    try {
      const hashPassword = await this.hashProvider.hash(dto.password);
      const user = await this.repository.register({ ...dto, password: hashPassword });
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user.');
    }
  }

  async changeProfilePicture(id: string, path: string): Promise<string> {
    try {
      await this.repository.changeProfilePicture(id, path);
      return 'Profile picture changed successfully';
    } catch (error) {
      console.error('Error changing profile picture:', error);
      throw new Error('Failed to change profile picture.');
    }
  }
}

export default UserService;
