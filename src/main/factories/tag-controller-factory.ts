import TagController from '@/infrastructure/controllers/tag';
import { RegisterTagUseCase } from '@/application/use-cases/tag/register-tag';
import { FindAllTagsByIdsUseCase } from '@/application/use-cases/tag/find-all-tags-by-ids';
import TagService from '@/application/services/tags';
import { TagRepository } from '@/infrastructure/repositories/tag';

export const makeTagController = () => {
  const tagRepository = new TagRepository();
  const tagService = new TagService(tagRepository);
  const registerTagUseCase = new RegisterTagUseCase(tagService);
  const findAllTagsByIdsUseCase = new FindAllTagsByIdsUseCase(tagService);

  return new TagController(registerTagUseCase, findAllTagsByIdsUseCase);
};
