import { Tag } from '@/models/tag';
import { TagNotFound } from '@/exceptions/tag-not-found';
import { IdNotProvided } from '@/exceptions/id-not-provided';
import { CreateTag, ITagRepository, ITagService } from '@/_types/tags/tags.type';

class TagService implements ITagService {
  private repository: ITagRepository;

  /**
   * Construtor do serviço TagService
   * @param {ITagRepository} repository - Instância do repositório para tags
   */
  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  /**
   * Cria uma nova instância do serviço TagService
   * @param {ITagRepository} repository - Repositório de tags
   * @returns {TagService} Instância do serviço TagService
   */
  static createInstance(repository: ITagRepository): TagService {
    return new TagService(repository);
  }

  /**
   * Busca várias tags pelos seus IDs
   * @param {string[]} ids - Array de IDs das tags
   * @returns {Promise<Tag[]>} Promise que resolve para a lista de tags encontradas
   * @throws {IdNotProvided} Se o array de IDs estiver vazio
   * @throws {TagNotFound} Se nenhuma tag for encontrada para os IDs fornecidos
   */
  async findAllByIds(ids: string[]): Promise<Tag[]> {
    if (!ids.length) {
      throw new IdNotProvided('Tag ID must be provided');
    }

    const tags = await this.repository.findAllByIds(ids);

    if (!tags || !tags.length) {
      throw new TagNotFound('One or more tags not found');
    }

    return tags;
  }

  /**
   * Registra uma nova tag
   * @param {CreateTag} dto - Dados para criação da tag
   * @returns {Promise<string>} Promise que resolve para o ID da tag criada
   * @throws {Erro} Erro caso ocorra falha no registro da tag
   */
  async register(dto: CreateTag): Promise<string> {
    try {
      const tag = await this.repository.register(dto);
      return tag.id;
    } catch (error) {
      console.error('Error registering tag:', error);
      throw error;
    }
  }
}

export default TagService;
