import { CreateTag, ITagService } from '@/application/_types/tags/tag.type';

export interface IRegisterTagUseCase {
  execute(dto: CreateTag): Promise<string>;
}

export class RegisterTagUseCase implements IRegisterTagUseCase {
  private readonly tagService: ITagService;

  constructor(tagService: ITagService) {
    this.tagService = tagService;
  }

  async execute(dto: CreateTag): Promise<string> {
    const tagId = await this.tagService.register(dto);
    return tagId;
  }
}
