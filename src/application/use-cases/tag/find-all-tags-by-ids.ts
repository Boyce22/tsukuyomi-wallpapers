import { Tag } from '@/domain/models/tag';
import { TagNotFound } from '@/domain/exceptions/tag/tag-not-found';
import { IdNotProvided } from '@/domain/exceptions/common/id-not-provided';
import { ITagRepository } from '@/application/_types/tags/tag.type';
export interface IFindAllTagsByIdsUseCase {
  execute(ids: string[]): Promise<Tag[]>;
}

export class FindAllTagsByIdsUseCase implements IFindAllTagsByIdsUseCase {
  private readonly repository: ITagRepository;

  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  async execute(ids: string[]): Promise<Tag[]> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new IdNotProvided('Tag ID(s) must be provided');
    }

    const tags = await this.repository.findAllByIds(ids);

    if (!tags || tags.length === 0) {
      throw new TagNotFound('One or more tags were not found');
    }

    return tags;
  }
}

export default FindAllTagsByIdsUseCase;
