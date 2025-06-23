import { CreateTag, ITagService } from '@/_types/tags/tag.type';
import type { Request, Response } from 'express';

/**
 * Controller responsável por lidar com requisições relacionadas à entidade Tag.
 * Utiliza os métodos definidos em {@link ITagService}.
 *
 * @class TagController
 */
class TagController {
  /**
   * Serviço responsável pela lógica de negócios de tags.
   * @private
   */
  private readonly service: ITagService;

  /**
   * Cria uma nova instância do {@link TagController}.
   *
   * @param {ITagService} service - Serviço responsável pela lógica de negócios de tags.
   */
  constructor(service: ITagService) {
    this.service = service;
  }

  /**
   * Cria e retorna uma nova instância do {@link TagController}.
   *
   * @param {ITagService} service - Instância do serviço de tags.
   * @returns {TagController} Nova instância do controller.
   */
  static createInstance(service: ITagService): TagController {
    return new TagController(service);
  }

  /**
   * Registra uma nova tag no sistema.
   *
   * Recebe os dados da tag no corpo da requisição, utiliza o serviço para registrar
   * e retorna o ID da tag criada.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP contendo os dados da nova tag no corpo.
   * @param {Response} res - Objeto da resposta HTTP. Retorna o ID da tag criada ou erro.
   * @returns {Promise<void>} Promise resolvida ao fim da operação.
   * @throws {Error} Quando ocorre falha na criação da tag.
   */
  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateTag = req.body;

    const tagId = await this.service.register(dto);

    res.status(201).json({ id: tagId });
  }

  /**
   * Busca uma lista de tags com base em um array de IDs fornecido.
   *
   * Valida que o campo `ids` do corpo da requisição seja um array de strings,
   * em seguida utiliza o serviço para buscar as tags correspondentes e as retorna.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP contendo `ids` no corpo.
   * @param {Response} res - Objeto da resposta HTTP com a lista de tags encontradas ou erro.
   * @returns {Promise<void>} Promise resolvida ao fim da operação.
   * @throws {Error} Quando ocorre falha na busca ou os dados são inválidos.
   */
  async findAllByIds(req: Request, res: Response): Promise<void> {
    const ids = req.body?.ids;

    if (!Array.isArray(ids) || !ids.every((id) => typeof id === 'string')) {
      res.status(400).json({ error: '`ids` deve ser um array de strings.' });
      return;
    }

    const tags = await this.service.findAllByIds(ids);
    res.status(200).json(tags);
  }
}

export default TagController;
