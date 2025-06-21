import { IStorageService } from '@/_types/storage/storage.type';
import StorageController from '@/controllers/storage';
import { Router, type Request, type Response } from 'express';

export const createStorageRouter = (service: IStorageService) => {
  const router = Router();
  const controller = StorageController.createInstance(service);

  router.get('/buckets', (req: Request, res: Response) => controller.getBuckets(req, res));

  return router;
};
