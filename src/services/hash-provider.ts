import bcrypt from 'bcryptjs';
import { IHashProvider } from '@/_types/auth/auth.type';

/**
 * Implementação do provedor de hash utilizando a biblioteca `bcryptjs`.
 *
 * Responsável por gerar hashes e compará-los, sendo útil para armazenar senhas com segurança.
 *
 * @class HashProvider
 * @implements {IHashProvider}
 */
class HashProvider implements IHashProvider {
  /**
   * Número de rounds de salt usados para gerar o hash.
   *
   * @private
   * @readonly
   * @type {number}
   */
  private readonly saltRounds = 10;

  /**
   * Cria uma nova instância da classe HashProvider.
   *
   * @constructor
   */
  constructor() {}

  /**
   * Cria e retorna uma nova instância do HashProvider.
   *
   * @static
   * @returns {HashProvider} Instância de HashProvider.
   */
  public static createInstance(): HashProvider {
    return new HashProvider();
  }

  /**
   * Gera o hash de uma senha utilizando `bcrypt`.
   *
   * @param {string} password - Senha em texto puro a ser criptografada.
   * @returns {Promise<string>} Promise que resolve para o hash gerado.
   * @throws {Error} Caso ocorra falha ao gerar o hash.
   */
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compara uma senha em texto puro com um hash previamente gerado.
   *
   * @param {string} password - Senha em texto puro.
   * @param {string} hash - Hash com o qual a senha será comparada.
   * @returns {Promise<boolean>} Promise que resolve para `true` se a senha corresponder ao hash, ou `false` caso contrário.
   * @throws {Error} Caso ocorra falha na comparação.
   */
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default HashProvider;
