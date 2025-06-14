
import { Tag } from '@/models/tag';
import { ITagService } from '@/_types/services/tags';
import { ITagRepository } from '@/_types/repositories/tags';
import { IdNotProvided } from '@/exceptions/id-not-provided';

class TagService implements ITagService {
  private repository: ITagRepository;

  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  findAllByIds = async (ids: string[]): Promise<Tag[] | null> => {
    if (!ids.length) {
      throw new IdNotProvided('Tag ID must be provided');
    }

    const tags = await this.repository.findAllByIds(ids);

    return tags;
  };
}

export default TagService
