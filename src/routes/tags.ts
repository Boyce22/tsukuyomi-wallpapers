import { Router, type Request, type Response } from 'express';

import TagsController from '@/controllers/tags';
import type { ITagService } from '@/_types/services/tags';

export const createTagsRouter = (tagService: ITagService) => {
  const router = Router();
  const controller = TagsController.createInstance(tagService);

  router.post('/', (req: Request, res: Response) => controller.register(req, res));
  router.post('/find-by-ids', (req: Request, res: Response) => controller.findAllByIds(req, res));

  return router;
};
