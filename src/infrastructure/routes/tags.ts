import { Router, type Request, type Response } from 'express';

import TagController from '@/infrastructure/controllers/tag';
import { ITagService } from '@/application/_types/tags/tag.type';
import { RegisterTagUseCase } from '@/application/use-cases/tag/register-tag';
import { FindAllTagsByIdsUseCase } from '@/application/use-cases/tag/find-all-tags-by-ids';

export const createTagsRouter = (tagService: ITagService) => {
  const router = Router();
  const registerTagUseCase = new RegisterTagUseCase(tagService);
  const findAllTagsByIdsUseCase = new FindAllTagsByIdsUseCase(tagService);
  const controller = TagController.createInstance(registerTagUseCase, findAllTagsByIdsUseCase);

  router.post('/', (req: Request, res: Response) => controller.register(req, res));
  router.post('/find-by-ids', (req: Request, res: Response) => controller.findAllByIds(req, res));

  return router;
};
