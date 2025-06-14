import { Tag } from '@/models/tag';
import { In, Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import type { ITagRepository } from '@/_types/repositories/tags';
import type { RegisterTag } from '@/_types/dtos/tags/register-tag';

/**
 * Repositório responsável por realizar operações no banco de dados relacionadas à entidade Tag.
 */
export class TagRepository implements ITagRepository {
  private repository: Repository<Tag>;

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
   * @returns {Promise<Tag[] | null>} Lista de tags encontradas ou null.
   */
  findAllByIds = async (ids: string[]): Promise<Tag[] | null> => {
    const tags = await this.repository.find({ where: { id: In([...ids]) } });
    return tags;
  };

  /**
   * Registra uma nova tag no banco de dados.
   * @param {RegisterTag} dto - Objeto contendo os dados da tag a ser registrada.
   * @returns {Promise<Tag>} A tag criada.
   */
  register = async (dto: RegisterTag): Promise<Tag> => {
    const tag = await this.repository.save({
      description: dto?.description,
      name: dto.name,
    });

    return tag;
  };
}
