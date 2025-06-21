import { CreateUser, IUserRepository, IUserService } from '@/_types/users/user.types';

class UserService implements IUserService {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  static createInstance(repository: IUserRepository) {
    return new UserService(repository);
  }

  async register(dto: CreateUser) {
    try {
      // futuramente retornar já logado

      const user = await this.repository.register(dto);

      return user.id;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user.');
    }
  }
}

export default UserService;
