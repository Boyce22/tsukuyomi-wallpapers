import { User } from '@/models/user';
import { Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { CreateUser, IUserRepository } from '@/_types/users/user.types';

/**
 * Repositório responsável por operações de persistência da entidade {@link User}.
 * Implementa a interface {@link IUserRepository}.
 */
class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  /**
   * Cria uma nova instância do UserRepository e obtém o repositório do TypeORM.
   */
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  /**
   * Cria uma nova instância da classe {@link UserRepository}.
   *
   * @returns {UserRepository} Instância do repositório de usuários.
   */
  static createInstace(): UserRepository {
    return new UserRepository();
  }

  /**
   * Registra um novo usuário no banco de dados.
   *
   * @param {CreateUser} dto - Objeto contendo os dados do usuário a ser criado.
   * @returns {Promise<User>} Promise resolvida com a entidade {@link User} criada.
   * @throws {Error} Caso ocorra falha ao salvar o usuário no banco de dados.
   */
  async register(dto: CreateUser): Promise<User> {
    const user = this.repository.create({
      email: dto.email,
      name: dto.name,
      lastName: dto.lastName,
      birthDate: dto.birthDate,
      password: dto.password,
      userName: dto.userName,
      profilePictureUrl: 'string', // FIXME: substituir pelo valor correto no futuro
    });

    return await this.repository.save(user);
  }
}

export default UserRepository;
