import type { Request, Response } from 'express';
import { CreateUser, IUserService } from '@/_types/users/user.types';

/**
 * Controller responsável por lidar com as requisições relacionadas a usuários.
 */
class UserController {
  private readonly service: IUserService;

  /**
   * Cria uma instância do UserController.
   *
   * @param {IUserService} service - Instância do serviço de usuários.
   */
  constructor(service: IUserService) {
    this.service = service;
  }

  /**
   * Cria uma nova instância do controller.
   *
   * @param {IUserService} service - Serviço para operações com usuários.
   * @returns {UserController} Instância do controller.
   */
  static createInstance(service: IUserService): UserController {
    return new UserController(service);
  }

  /**
   * Endpoint para registrar um novo usuário.
   *
   * @param {Request} req - Objeto da requisição HTTP contendo os dados do usuário no corpo.
   * @param {Response} res - Objeto da resposta HTTP.
   * @returns {Promise<void>} Retorna JSON com mensagem de sucesso ou erro.
   * @throws {Error} Caso ocorra falha na validação ou registro do usuário.
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
