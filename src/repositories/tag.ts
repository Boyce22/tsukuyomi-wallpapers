import { Tag } from '@/models/tag';
import { In, Repository } from 'typeorm';
import AppDataSource from '@/config/database';

import { CreateTag, ITagRepository } from '@/_types/tags/tag.type';

/**
 * Repositório responsável pelas operações de acesso a dados da entidade Tag.
 * Implementa a interface ITagRepository.
 */
export class TagRepository implements ITagRepository {
  private repository: Repository<Tag>;

  /**
   * Inicializa o repositório TypeORM para a entidade Tag.
   */
  constructor() {
    this.repository = AppDataSource.getRepository(Tag);
  }

  /**
   * Cria uma nova instância do repositório de tags.
   *
   * @returns {TagRepository} Nova instância do repositório.
   */
  static createInstance(): TagRepository {
    return new TagRepository();
  }

  /**
   * Busca todas as tags que correspondem a uma lista de IDs.
   *
   * @param {string[]} ids - Array contendo os IDs das tags a serem buscadas.
   * @returns {Promise<Tag[]>} Promise que resolve com a lista de tags encontradas.
   */
  async findAllByIds(ids: string[]): Promise<Tag[]> {
    return this.repository.find({ where: { id: In(ids) } });
  }

  /**
   * Registra uma nova tag no banco de dados.
   *
   * @param {CreateTag} dto - Objeto com os dados para criação da tag.
   * @returns {Promise<Tag>} Promise que resolve para a tag recém-criada.
   */
  async register(dto: CreateTag): Promise<Tag> {
    const tag = this.repository.create({
      name: dto.name,
      description: dto.description,
    });

    return this.repository.save(tag);
  }
}
