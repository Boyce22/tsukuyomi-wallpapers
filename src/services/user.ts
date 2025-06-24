import type { User } from '@/models/user';

import { CreateUser, IUserRepository, IUserService, UpdateNameUser } from '@/_types/users/user.types';
import { NotFound } from '@/exceptions/not-found';

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

 TSU-002
  /**
   * Atualiza o nome de um usuário com base no ID
   * @param id - ID do usuário
   * @param data - Objeto contendo o novo nome
   * @returns Usuário atualizado
   * @throws InvalidArgumentError se o ID ou nome não forem fornecidos
   * @throws NotFound se o usuário não for encontrado no repositório
   */
  async updateName(ids: string, data: Pick<User, 'name'>): Promise<UpdateNameUser> {
    if (!ids || !data.name) {
      throw new NotFound('User ID and name must be provided.');
    }

    const updatedUser = await this.repository.update(ids, { name: data.name });

    if (!updatedUser) {
      throw new NotFound(`User with id ${ids} not found`);
    }

    return updatedUser;

  async changeProfilePicture(id: string, path: string): Promise<string> {
    try {
      await this.repository.changeProfilePicture(id, path);
      return 'Profile picture changed successfully';
    } catch (error) {
      console.error('Error changing profile picture:', error);
      throw new Error('Failed to change profile picture.');
    }
 develop
  }
}

export default UserService;
