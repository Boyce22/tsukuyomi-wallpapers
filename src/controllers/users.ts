import type { Request, Response } from 'express';
import { CreateUser, IUserService } from '@/_types/users/user.types';

/**
 * Controller responsável por lidar com requisições relacionadas à entidade User.
 * Utiliza os métodos definidos em {@link IUserService}.
 */
class UserController {
  private readonly service: IUserService;

  /**
   * Cria uma nova instância do {@link UserController}.
   *
   * @param {IUserService} service - Instância do serviço responsável pela lógica de usuários.
   */
  constructor(service: IUserService) {
    this.service = service;
  }

  /**
   * Cria e retorna uma nova instância do {@link UserController}.
   *
   * @param {IUserService} service - Instância do serviço de usuários.
   * @returns {UserController} Nova instância do controller.
   */
  static createInstance(service: IUserService): UserController {
    return new UserController(service);
  }

  /**
   * Endpoint responsável por registrar um novo usuário.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP contendo os dados do novo usuário em `req.body`.
   * @param {Response} res - Objeto da resposta HTTP. Retorna mensagem de sucesso ou erro.
   * @returns {Promise<void>} Promise resolvida após o término da operação.
   * @throws {Error} Lança erro em caso de falha na validação ou persistência do usuário.
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateUser = req.body;
      const message = await this.service.register(dto);
      res.status(201).json({ message });
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
      const statusCode = error instanceof Error ? 400 : 500;
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(statusCode).json({ error: message });
    }
  }
}

export default UserController;
