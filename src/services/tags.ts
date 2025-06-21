import { Tag } from '@/models/tag';
import { TagNotFound } from '@/exceptions/tag-not-found';
import { IdNotProvided } from '@/exceptions/id-not-provided';
import { CreateTag, ITagRepository, ITagService } from '@/_types/tags/tag.type';

/**
 * Serviço responsável pela lógica de negócio relacionada à entidade Tag.
 *
 * Implementa a interface ITagService.
 */
class TagService implements ITagService {
  private readonly repository: ITagRepository;

  /**
   * Cria uma instância do serviço de tags.
   *
   * @param {ITagRepository} repository - Repositório para operações de persistência das tags.
   */
  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  /**
   * Cria uma nova instância do serviço a partir do repositório fornecido.
   *
   * @param {ITagRepository} repository - Repositório para persistência das tags.
   * @returns {TagService} Instância do serviço.
   */
  static createInstance(repository: ITagRepository): TagService {
    return new TagService(repository);
  }

  /**
   * Busca múltiplas tags com base em seus IDs.
   *
   * @param {string[]} ids - Array contendo os IDs das tags a serem buscadas.
   * @returns {Promise<Tag[]>} Promessa que resolve para a lista de tags encontradas.
   * @throws {IdNotProvided} Se o array de IDs estiver vazio ou inválido.
   * @throws {TagNotFound} Se nenhuma tag correspondente for encontrada.
   */
  async findAllByIds(ids: string[]): Promise<Tag[]> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new IdNotProvided('Tag ID(s) must be provided');
    }

    const tags = await this.repository.findAllByIds(ids);

    if (!tags || tags.length === 0) {
      throw new TagNotFound('One or more tags were not found');
    }

    return tags;
  }

  /**
   * Registra uma nova tag no sistema.
   *
   * @param {CreateTag} dto - Dados da tag a ser criada.
   * @returns {Promise<string>} Promessa que resolve para o ID da tag criada.
   * @throws {Error} Caso ocorra falha ao criar a tag.
   */
  async register(dto: CreateTag): Promise<string> {
    try {
      const tag = await this.repository.register(dto);
      return tag.id;
    } catch (error) {
      console.error('Failed to register tag:', error);
      throw new Error('Error while creating tag');
    }
  }
}

export default TagService;
