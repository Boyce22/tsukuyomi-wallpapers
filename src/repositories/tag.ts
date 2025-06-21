import { Tag } from '@/models/tag';
import { In, Repository } from 'typeorm';
import AppDataSource from '@/config/database';

import { CreateTag, ITagRepository } from '@/_types/tags/tag.type';

/**
 * Repositório responsável pelas operações de persistência da entidade {@link Tag}.
 * Implementa a interface {@link ITagRepository}.
 */
export class TagRepository implements ITagRepository {
  private repository: Repository<Tag>;

  /**
   * Cria uma nova instância do {@link TagRepository} e inicializa o repositório do TypeORM.
   */
  constructor() {
    this.repository = AppDataSource.getRepository(Tag);
  }

  /**
   * Cria uma nova instância do repositório de tags.
   *
   * @returns {TagRepository} Nova instância de {@link TagRepository}.
   */
  static createInstance(): TagRepository {
    return new TagRepository();
  }

  /**
   * Busca todas as tags que correspondem a uma lista de IDs fornecida.
   *
   * @param {string[]} ids - Lista de IDs das tags a serem buscadas.
   * @returns {Promise<Tag[]>} Promise resolvida com as tags encontradas.
   * @throws {Error} Caso ocorra falha na consulta ao banco de dados.
   */
  async findAllByIds(ids: string[]): Promise<Tag[]> {
    return this.repository.find({ where: { id: In(ids) } });
  }

  /**
   * Registra uma nova tag no banco de dados.
   *
   * @param {CreateTag} dto - Objeto contendo os dados da tag a ser criada.
   * @returns {Promise<Tag>} Promise resolvida com a entidade {@link Tag} criada.
   * @throws {Error} Caso ocorra falha ao salvar a tag no banco de dados.
   */
  async register(dto: CreateTag): Promise<Tag> {
    const tag = this.repository.create({
      name: dto.name,
      description: dto.description,
    });

    return await this.repository.save(tag);
  }
}
