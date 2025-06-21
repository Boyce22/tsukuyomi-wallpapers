import type { Request, Response } from 'express';
import { IStorageService } from '@/_types/storage/storage.type';

/**
 * Controller responsável por lidar com requisições relacionadas ao serviço de armazenamento.
 * Implementa operações expostas pela interface {@link IStorageService}.
 */
class StorageController {
  private readonly service: IStorageService;

  /**
   * Cria uma nova instância do {@link StorageController}.
   *
   * @param {IStorageService} service - Serviço de armazenamento a ser utilizado pelo controller.
   */
  constructor(service: IStorageService) {
    this.service = service;
  }

  /**
   * Cria uma nova instância do {@link StorageController} com o serviço injetado.
   *
   * @param {IStorageService} service - Instância do serviço de armazenamento.
   * @returns {StorageController} Instância inicializada do controller.
   */
  static createInstance(service: IStorageService): StorageController {
    return new StorageController(service);
  }

  /**
   * Lista todos os buckets disponíveis no serviço de armazenamento.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP (não utilizado).
   * @param {Response} res - Objeto da resposta HTTP. Retorna status 200 com a lista de buckets,
   * ou status 400/500 em caso de erro.
   * @returns {Promise<void>} Promise resolvida quando a operação for concluída.
   * @throws {Error} Quando ocorre falha na comunicação com o serviço de armazenamento.
   */
  async getBuckets(req: Request, res: Response): Promise<void> {
    const buckets = await this.service.getBuckets();
    
    res.status(200).json({ buckets });
  }
}

export default StorageController;
