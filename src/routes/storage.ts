import { IStorageService } from '@/_types/storage/storage.type';
import StorageController from '@/controllers/storage';
import { Router, type Request, type Response } from 'express';

export const createStorageRouter = (storageService: IStorageService) => {
  const router = Router();
  const controller = StorageController.createInstance(storageService);

  router.get('/buckets', (req: Request, res: Response) => controller.getBuckets(req, res));

  return router;
};
