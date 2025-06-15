import { CreateTag, ITagService } from '@/_types/tags/tags.type';
import type { Request, Response } from 'express';

/**
 * Controller responsável por lidar com requisições relacionadas a tags.
 */
class TagsController {
  private service: ITagService;

  /**
   * Construtor do TagsController.
   *
   * @param {ITagService} service - Serviço que implementa a lógica de negócios para tags.
   */
  constructor(service: ITagService) {
    this.service = service;
  }

  /**
   * Cria uma nova instância do controller TagsController.
   *
   * @param {ITagService} service - Serviço de tags.
   * @returns {TagsController} Instância do controller.
   */
  static createInstance(service: ITagService): TagsController {
    return new TagsController(service);
  }

  /**
   * Registra uma nova tag no sistema.
   *
   * @param {Request} req - Objeto da requisição HTTP contendo os dados da tag no corpo.
   * @param {Response} res - Objeto da resposta HTTP para enviar o resultado.
   * @returns {Promise<void>} Promessa que representa a conclusão da operação.
   */
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: CreateTag = req.body;
      const tagId = await this.service.register(dto);
      res.status(201).json({ id: tagId });
    } catch (error: unknown) {
      console.error('Error registering tag:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

  /**
   * Busca todas as tags com base em uma lista de IDs fornecida.
   *
   * @param {Request} req - Objeto da requisição HTTP contendo o array de IDs no corpo (`req.body.ids`).
   * @param {Response} res - Objeto da resposta HTTP com as tags encontradas.
   * @returns {Promise<void>} Promessa que representa a conclusão da operação.
   */
  findAllByIds = async (req: Request, res: Response): Promise<void> => {
    try {
      const ids: string[] = req.body.ids;

      if (!Array.isArray(ids)) {
        res.status(400).json({ error: 'ids must be an array of strings' });
        return;
      }

      const tags = await this.service.findAllByIds(ids);
      res.status(200).json(tags);
    } catch (error) {
      console.error('Error finding tags by IDs:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}

export default TagsController;
