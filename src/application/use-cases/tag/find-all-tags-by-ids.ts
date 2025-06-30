import { ITagService } from '@/application/_types/tags/tag.type';
import { Tag } from '@/domain/models/tag';

export interface IFindAllTagsByIdsUseCase {
  execute(ids: string[]): Promise<Tag[]>;
}

export class FindAllTagsByIdsUseCase implements IFindAllTagsByIdsUseCase {
  private readonly tagService: ITagService;

  constructor(tagService: ITagService) {
    this.tagService = tagService;
  }

  async execute(ids: string[]): Promise<Tag[]> {
    const tags = await this.tagService.findAllByIds(ids);
    return tags;
  }
}
