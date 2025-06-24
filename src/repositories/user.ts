import { User } from '@/models/user';
import { Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { CreateUser, IUserRepository, UpdateNameUser } from '@/_types/users/user.types';
import { NotFound } from '@/exceptions/not-found';

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

  /**
   * Busca um usuário pelo seu email.
   *
   * @param {string} email - Email do usuário
   * @returns - Promise resolvida com a entidade {@link User} correspondente ao email fornecido, ou null se nenhuma correspondência for encontrada.
   */

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

 TSU-002
  async update(ids: string, data: Pick<User, 'name'>): Promise<UpdateNameUser> {
    const updatedUser = await this.repository.update(ids, { name: data.name });
    if (!updatedUser.affected) {
      throw new NotFound(`User with id ${ids} not found`);
    }
    return { name: data.name };

  async changeProfilePicture(id: string, path: string): Promise<void> {
    await this.repository.update({ id }, { profilePictureUrl: path });
 develop
  }
}

export default UserRepository;
