import { Router, type Request, type Response } from 'express';

import TagController from '@/controllers/tag';
import { ITagService } from '@/_types/tags/tag.type';

export const createTagsRouter = (service: ITagService) => {
  const router = Router();
  const controller = TagController.createInstance(service);

  router.post('/', (req: Request, res: Response) => controller.register(req, res));
  router.post('/find-by-ids', (req: Request, res: Response) => controller.findAllByIds(req, res));

  return router;
};
