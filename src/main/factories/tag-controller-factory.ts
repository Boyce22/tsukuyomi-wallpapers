import TagController from '@/infrastructure/controllers/tag';
import { RegisterTagUseCase } from '@/application/use-cases/tag/register-tag';
import { FindAllTagsByIdsUseCase } from '@/application/use-cases/tag/find-all-tags-by-ids';
import { TagRepository } from '@/infrastructure/repositories/tag';

export const makeTagController = () => {
  const tagRepository = new TagRepository();
  const registerTagUseCase = new RegisterTagUseCase(tagRepository);
  const findAllTagsByIdsUseCase = new FindAllTagsByIdsUseCase(tagRepository);

  return new TagController(registerTagUseCase, findAllTagsByIdsUseCase);
};
