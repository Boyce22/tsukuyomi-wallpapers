import { Tag } from '@/domain/models/tag';
import { TagNotFound } from '@/domain/exceptions/tag-not-found';
import { IdNotProvided } from '@/domain/exceptions/id-not-provided';
import { CreateTag, ITagRepository, ITagService } from '@/application/_types/tags/tag.type';
import { TagRegistrationError } from '@/domain/exceptions/tag-registration-error';

class TagService implements ITagService {
  private readonly repository: ITagRepository;

  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

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

  async register(dto: CreateTag): Promise<string> {
    try {
      const tag = await this.repository.register(dto);
      return tag.id;
    } catch (error) {
      console.error('Failed to register tag:', error);
      throw new TagRegistrationError('Error while creating tag');
    }
  }
}

export default TagService;
