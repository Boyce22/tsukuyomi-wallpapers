import jwt from 'jsonwebtoken';

import { IUserRepository } from '@/_types/users/user.types';
import { AuthToken, IAuthService, IHashProvider } from '@/_types/auth/auth.type';

/**
 * Serviço responsável pela autenticação dos usuários,
 * validando credenciais e gerando tokens JWT.
 *
 * @implements {IAuthService}
 */
class AuthService implements IAuthService {
  /**
   * Repositório para acesso e manipulação dos dados do usuário.
   * @private
   */
  private readonly userRepository: IUserRepository;

  /**
   * Provedor para comparação e geração de hashes de senha.
   * @private
   */
  private readonly hashProvider: IHashProvider;

  /**
   * Cria uma nova instância do {@link AuthService}.
   *
   * @param {IUserRepository} userRepository - Repositório de usuários.
   * @param {IHashProvider} hashProvider - Provedor de hash para senhas.
   */
  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  /**
   * Cria e retorna uma instância do serviço de autenticação.
   *
   * @param {IUserRepository} userRepository - Repositório de usuários.
   * @param {IHashProvider} hashProvider - Provedor de hash para senhas.
   * @returns {IAuthService} Instância do serviço de autenticação.
   */
  static createInstance(userRepository: IUserRepository, hashProvider: IHashProvider): IAuthService {
    return new AuthService(userRepository, hashProvider);
  }

  /**
   * Autentica um usuário pelo email e senha.
   *
   * Verifica se o usuário existe e se a senha está correta.
   * Caso válido, gera e retorna um token JWT com tempo de expiração.
   *
   * @async
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário em texto puro.
   * @returns {Promise<AuthToken>} Promise que resolve para um objeto contendo o token de acesso e a data de expiração.
   * @throws {Error} Lança erro caso email ou senha estejam incorretos.
   */
  async authenticate(email: string, password: string): Promise<AuthToken> {
    const user = await this.userRepository.findByEmail(email);

    const isValid = user && (await this.hashProvider.compare(password, user.password));

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return {
      accessToken: token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      message: 'Successfully authenticated',
    };
  }
}

export default AuthService;
