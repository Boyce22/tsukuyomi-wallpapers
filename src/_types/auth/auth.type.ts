/**
 * Representa o token de autenticação gerado após login bem-sucedido.
 *
 * @typedef {Object} AuthToken
 * @property {string} accessToken - Token JWT para autenticação nas requisições.
 * @property {Date} expiresAt - Data e hora de expiração do token.
 */
export type AuthToken = {
  accessToken: string;
  expiresAt: Date;
  message: string;
};

/**
 * Interface do serviço de autenticação.
 *
 * @interface IAuthService
 */
export interface IAuthService {
  /**
   * Autentica um usuário pelo email e senha.
   *
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha em texto puro do usuário.
   * @returns {Promise<AuthToken>} Promise que resolve para o token de autenticação.
   * @throws {Error} Caso as credenciais sejam inválidas.
   */
  authenticate(email: string, password: string): Promise<AuthToken>;
}

/**
 * Interface do repositório de autenticação.
 *
 * @interface IAuthRepository
 * @description Atualmente vazia, pode ser estendida para operações específicas relacionadas à autenticação.
 */
export interface IAuthRepository {}

/**
 * Interface para provedores de hash de senha.
 *
 * @interface IHashProvider
 */
export interface IHashProvider {
  /**
   * Gera um hash seguro para a senha fornecida.
   *
   * @param {string} password - Senha em texto puro.
   * @returns {Promise<string>} Promise que resolve para o hash gerado.
   */
  hash(password: string): Promise<string>;

  /**
   * Compara uma senha em texto puro com um hash existente para validação.
   *
   * @param {string} password - Senha em texto puro.
   * @param {string} hash - Hash para comparação.
   * @returns {Promise<boolean>} Promise que resolve para `true` se a senha corresponder ao hash, ou `false` caso contrário.
   */
  compare(password: string, hash: string): Promise<boolean>;
}
