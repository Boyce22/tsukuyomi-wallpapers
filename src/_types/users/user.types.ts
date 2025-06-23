import type { User } from '@/models/user';
import { AuthToken } from '../auth/auth.type';

/**
 * DTO (Data Transfer Object) para criação de um novo usuário.
 *
 * @typedef {Object} CreateUser
 * @property {string} email - Email do usuário.
 * @property {string} name - Nome do usuário.
 * @property {string} lastName - Sobrenome do usuário.
 * @property {string} userName - Nome de usuário (login).
 * @property {string} birthDate - Data de nascimento no formato ISO (yyyy-mm-dd).
 * @property {string} password - Senha do usuário (deve ser armazenada de forma segura).
 */
export type CreateUser = {
  email: string;
  name: string;
  lastName: string;
  userName: string;
  birthDate: string;
  password: string;
};

/**
 * Interface da camada de serviço responsável pela lógica de negócios relacionada a usuários.
 *
 * @interface IUserService
 */
export interface IUserService {
  /**
   * Registra um novo usuário na aplicação.
   *
   * @param {CreateUser} dto - Dados necessários para criar o usuário.
   * @returns {Promise<User>} Promise que resolve para o usuário criado.
   * @throws {Error} Caso ocorra falha ao registrar o usuário.
   */
  register(dto: CreateUser): Promise<User>;

  /**
   * Altera a foto de perfil de um usuário existente.
   *
   * @param {string} id - Identificador único do usuário.
   * @param {string} path - Caminho (path) da nova imagem de perfil.
   * @returns {Promise<void>} Promise que resolve quando a operação for concluída.
   * @throws {Error} Caso ocorra falha ao atualizar a imagem de perfil.
   */
  changeProfilePicture(id: string, path: string): Promise<String>;
}

/**
 * Interface do repositório responsável pelas operações de acesso a dados da entidade `User`.
 *
 * @interface IUserRepository
 */
export interface IUserRepository {
  /**
   * Registra um novo usuário no banco de dados.
   *
   * @param {CreateUser} dto - Dados necessários para criar o usuário.
   * @returns {Promise<User>} Promise que resolve para a entidade `User` criada.
   * @throws {Error} Caso ocorra falha ao salvar o usuário.
   */
  register(dto: CreateUser): Promise<User>;

  /**
   * Busca um usuário pelo seu email.
   *
   * @param {string} email - Email do usuário.
   * @returns {Promise<User | null>} Promise que resolve para a entidade `User` ou `null` se não encontrado.
   * @throws {Error} Caso ocorra falha na consulta ao banco de dados.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Atualiza a imagem de perfil de um usuário no banco de dados.
   *
   * @param {string} id - Identificador único do usuário.
   * @param {string} path - Caminho (path) da nova imagem de perfil.
   * @returns {Promise<void>} Promise que resolve quando a operação for concluída.
   * @throws {Error} Caso ocorra falha ao atualizar a imagem de perfil.
   */
  changeProfilePicture(id: string, path: string): Promise<void>;
}
