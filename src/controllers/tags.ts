import type { Request, Response } from 'express';
import type { ITagService } from '@/_types/services/tags';
import type { RegisterTag } from '@/_types/dtos/tags/register-tag';

/**
 * Controller responsável por lidar com requisições relacionadas a tags.
 */
class TagsController {
  private service: ITagService;

  /**
   * @param service - Instância do serviço que contém a lógica de negócios para tags
   */
  constructor(service: ITagService) {
    this.service = service;
  }

  /**
   * Cria uma nova instância do controller TagsController
   * @param service - Serviço de tags com a lógica de negócios
   * @returns Instância do controller
   */
  static createInstance(service: ITagService): TagsController {
    return new TagsController(service);
  }

  /**
   * Registra uma nova tag no sistema
   * @param req - Objeto da requisição HTTP do Express contendo os dados da tag no corpo
   * @param res - Objeto de resposta HTTP do Express
   * @returns Resposta HTTP com a tag criada ou erro
   */
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: RegisterTag = req.body;
      const tag = await this.service.register(dto);

      res.status(201).json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /**
   * Busca todas as tags com base em uma lista de IDs fornecida
   * @param req - Objeto da requisição HTTP contendo o array de IDs no corpo
   * @param res - Objeto de resposta HTTP do Express
   * @returns Resposta HTTP com a lista de tags encontradas ou erro
   */
  findAllByIds = async (req: Request, res: Response): Promise<void> => {
    try {
      const ids: string[] = req.body.ids;

      const tags = await this.service.findAllByIds(ids);

      res.status(200).json(tags);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default TagsController;
