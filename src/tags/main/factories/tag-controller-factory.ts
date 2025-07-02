import TagController from '@tags/infrastructure/controllers/tag';
import { RegisterTagUseCase } from '@tags/application/use-cases/register-tag';
import { FindAllTagsByIdsUseCase } from '@tags/application/use-cases/find-all-tags-by-ids';
import { TagRepository } from '@tags/infrastructure/repositories/tag';

export const makeTagController = () => {
  const tagRepository = new TagRepository();
  const registerTagUseCase = new RegisterTagUseCase(tagRepository);
  const findAllTagsByIdsUseCase = new FindAllTagsByIdsUseCase(tagRepository);

  return new TagController(registerTagUseCase, findAllTagsByIdsUseCase);
};
