import { Tag } from '@/models/tag';
import { IdNotProvided } from '@/exceptions/id-not-provided';

import type { ITagService } from '@/_types/services/tags';
import type { ITagRepository } from '@/_types/repositories/tags';
import type { RegisterTag } from '@/_types/dtos/tags/register-tag';
import { TagNotFound } from '@/exceptions/tag-not-found';

class TagService implements ITagService {
  private repository: ITagRepository;

  /**
   * Construtor do serviço TagService
   * @param repository - Instância do repositório para tags
   */
  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  static createInstance(repository: ITagRepository) {
    return new TagService(repository);
  }

  /**
   * Busca várias tags pelos seus IDs
   * @param ids - Array de IDs das tags
   * @returns Lista de tags encontradas ou null se não houver IDs
   * @throws IdNotProvided se o array de IDs estiver vazio
   * @throws TagNotFound se o array de Tags estiver vazio ou nulo
   */
  findAllByIds = async (ids: string[]): Promise<Tag[]> => {
    if (!ids.length) {
      throw new IdNotProvided('Tag ID must be provided');
    }

    const tags = await this.repository.findAllByIds(ids);

    if (!tags || !tags.length) {
      throw new TagNotFound('One or more tags not found');
    }

    return tags;
  };

  /**
   * Registra uma nova tag, possivelmente associando-a a outras tags
   * @param dto - Dados para criação da tag
   * @param tags - Lista de tags associadas (opcional)
   * @returns ID da tag criada
   * @throws Erro ao registrar a tag
   */
  register = async (dto: RegisterTag): Promise<string> => {
    try {
      const tag = await this.repository.register(dto);
      return tag.id;
    } catch (error) {
      console.error('Error registering tag:', error);
      throw error;
    }
  };
}

export default TagService;
