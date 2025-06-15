import { Tag } from '@/models/tag';
import { In, Repository } from 'typeorm';
import AppDataSource from '@/config/database';

import { CreateTag, ITagRepository } from '@/_types/tags/tags.type';

/**
 * Repositório responsável por operações no banco de dados relacionadas à entidade Tag.
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
   * @returns {TagRepository} Nova instância de TagRepository.
   */
  static createInstance(): TagRepository {
    return new TagRepository();
  }

  /**
   * Busca todas as tags que correspondem a uma lista de IDs.
   * @param {string[]} ids - Lista de IDs das tags a serem buscadas.
   * @returns {Promise<Tag[]>} Promise que resolve com a lista de tags encontradas.
   */
  findAllByIds = async (ids: string[]): Promise<Tag[]> => {
    return this.repository.find({ where: { id: In(ids) } });
  };

  /**
   * Registra uma nova tag no banco de dados.
   * @param {CreateTag} dto - Objeto contendo os dados da tag a ser registrada.
   * @returns {Promise<Tag>} Promise que resolve para a tag criada.
   */
  register = async (dto: CreateTag): Promise<Tag> => {
    const tag = this.repository.create({
      description: dto.description,
      name: dto.name,
    });

    return this.repository.save(tag);
  };
}
