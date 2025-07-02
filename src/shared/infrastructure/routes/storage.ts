import { Router, type Request, type Response } from 'express';
import { makeStorageController } from '@shared/main/factories/storage-controller-factory';

export const createStorageRouter = () => {
  const router = Router();
  const controller = makeStorageController();

  router.get('/buckets', (req: Request, res: Response) => controller.getBuckets(req, res));

  return router;
};
