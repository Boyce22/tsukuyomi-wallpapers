import { Router, type Request, type Response } from 'express';
import { makeTagController } from '@tags/main/factories/tag-controller-factory';

export const createTagsRouter = () => {
  const router = Router();
  const controller = makeTagController();

  router.post('/', (req: Request, res: Response) => controller.register(req, res));
  router.post('/find-by-ids', (req: Request, res: Response) => controller.findAllByIds(req, res));

  return router;
};
