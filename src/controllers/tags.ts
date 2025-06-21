import { CreateTag, ITagService } from '@/_types/tags/tags.type';
import type { Request, Response } from 'express';

/**
 * Controller responsável por lidar com requisições relacionadas a tags.
 */
class TagsController {
  private readonly service: ITagService;

  /**
   * Cria uma nova instância do TagsController.
   *
   * @param service - Serviço que implementa a lógica de negócios para tags.
   */
  constructor(service: ITagService) {
    this.service = service;
  }

  /**
   * Método auxiliar para instanciar o controller.
   *
   * @param service - Instância do serviço de tags.
   * @returns Nova instância de TagsController.
   */
  static createInstance(service: ITagService): TagsController {
    return new TagsController(service);
  }

  /**
   * Registra uma nova tag no sistema.
   *
   * @param req - Requisição HTTP contendo os dados da tag no corpo.
   * @param res - Resposta HTTP que retorna o ID da tag criada.
   */
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: CreateTag = req.body;
      const tagId = await this.service.register(dto);
      res.status(201).json({ id: tagId });
    } catch (error) {
      console.error('Erro ao registrar tag:', error);
      res.status(error instanceof Error ? 400 : 500).json({
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  };

  /**
   * Busca múltiplas tags com base em uma lista de IDs fornecida.
   *
   * @param req - Requisição HTTP contendo o array de IDs no corpo (`req.body.ids`).
   * @param res - Resposta HTTP com as tags encontradas.
   */
  findAllByIds = async (req: Request, res: Response): Promise<void> => {
    try {
      const ids = req.body?.ids;

      if (!Array.isArray(ids) || !ids.every((id) => typeof id === 'string')) {
        res.status(400).json({ error: '`ids` deve ser um array de strings.' });
        return;
      }

      const tags = await this.service.findAllByIds(ids);
      res.status(200).json(tags);
    } catch (error) {
      console.error('Erro ao buscar tags pelos IDs:', error);
      res.status(error instanceof Error ? 400 : 500).json({
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  };
}

export default TagsController;
