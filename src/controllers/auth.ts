import { AuthToken, IAuthService } from '@/_types/auth/auth.type';
import type { Request, Response } from 'express';

/**
 * Controller responsável pela autenticação dos usuários.
 *
 * @class AuthControler
 */
class AuthControler {
  /**
   * Serviço de autenticação utilizado para validar credenciais e gerar tokens.
   * @private
   */
  private readonly authService: IAuthService;

  /**
   * Cria uma nova instância do {@link AuthControler}.
   *
   * @param {IAuthService} authService - Serviço de autenticação.
   */
  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  /**
   * Cria e retorna uma nova instância do {@link AuthControler}.
   *
   * @param {IAuthService} authService - Serviço de autenticação.
   * @returns {AuthControler} Nova instância do controller.
   */
  static createInstance(authService: IAuthService): AuthControler {
    return new AuthControler(authService);
  }

  /**
   * Autentica o usuário com email e senha.
   *
   * Valida os dados recebidos no corpo da requisição e retorna um token de autenticação.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP contendo `email` e `password` em `req.body`.
   * @param {Response} res - Objeto da resposta HTTP onde será enviada a resposta.
   * @returns {Promise<void>} Promise que resolve quando a resposta for enviada.
   * @throws {Error} Caso o email ou senha não sejam fornecidos.
   */
  async authenticate(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const token: AuthToken = await this.authService.authenticate(email, password);

    res.json(token);
  }
}

export default AuthControler;
