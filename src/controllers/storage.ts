import type { Request, Response } from 'express';
import { IStorageService } from '@/_types/storage/storage.type';

/**
 * Controller responsável por gerenciar operações de armazenamento.
 */
class StorageController {
  private readonly service: IStorageService;

  /**
   * Cria uma instância do StorageController.
   *
   * @param {IStorageService} service - Instância do serviço de armazenamento.
   */
  constructor(service: IStorageService) {
    this.service = service;
  }

  /**
   * Cria uma nova instância do controller.
   *
   * @static
   * @param {IStorageService} service - Serviço para operações de armazenamento.
   * @returns {StorageController} Instância do controller.
   */
  static createInstance(service: IStorageService): StorageController {
    return new StorageController(service);
  }

  /**
   * Endpoint para listar todos os buckets disponíveis.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP (não utilizado).
   * @param {Response} res - Objeto da resposta HTTP.
   * @returns {Promise<void>} Retorna JSON com a lista de buckets ou um erro.
   * @throws {Error} Quando ocorre falha na comunicação com o serviço de armazenamento.
   */
  getBuckets = async (req: Request, res: Response): Promise<void> => {
    try {
      const buckets = await this.service.getBuckets();
      res.status(200).json({ buckets });
    } catch (error) {
      console.error('Erro ao listar buckets:', error);
      res.status(error instanceof Error ? 400 : 500).json({
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  };
}

export default StorageController;
