import { CreateTag, ITagRepository } from '@/application/_types/tags/tag.type';
import { TagRegistrationError } from '@/domain/exceptions/tag/tag-registration-error';

export interface IRegisterTagUseCase {
  execute(dto: CreateTag): Promise<string>;
}

export class RegisterTagUseCase implements IRegisterTagUseCase {
  private readonly repository: ITagRepository;

  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  async execute(dto: CreateTag): Promise<string> {
    try {
      const tag = await this.repository.register(dto);
      return tag.id;
    } catch (error) {
      console.error('Failed to register tag:', error);
      throw new TagRegistrationError('Error while creating tag');
    }
  }
}
