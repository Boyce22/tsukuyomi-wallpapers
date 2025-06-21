import type { User } from '@/models/user';

import { CreateUser, IUserRepository, IUserService } from '@/_types/users/user.types';

/**
 * Serviço responsável pela lógica de negócio relacionada à entidade User.
 * Implementa a interface {@link IUserService}.
 */
class UserService implements IUserService {
  private readonly repository: IUserRepository;

  /**
   * Cria uma instância do serviço de usuários.
   *
   * @param {IUserRepository} repository - Repositório para operações de persistência dos usuários.
   */
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  /**
   * Cria uma nova instância do serviço a partir do repositório fornecido.
   *
   * @param {IUserRepository} repository - Repositório para persistência dos usuários.
   * @returns {UserService} Instância do serviço.
   */
  static createInstance(repository: IUserRepository): UserService {
    return new UserService(repository);
  }

  /**
   * Registra um novo usuário no sistema.
   *
   * @param {CreateUser} dto - Dados necessários para criação do usuário.
   * @returns {Promise<User>} Promessa que resolve para o ID do usuário criado.
   * @throws {Error} Caso ocorra falha ao registrar o usuário.
   */
  async register(dto: CreateUser): Promise<User> {
    try {
      const user = await this.repository.register(dto);
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user.');
    }
  }
}

export default UserService;
