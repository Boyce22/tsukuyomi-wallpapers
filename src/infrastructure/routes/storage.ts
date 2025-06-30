import StorageController from '@/infrastructure/controllers/storage';
import { Router, type Request, type Response } from 'express';
import { IStorageService } from '@/application/_types/storage/storage.type';
import { GetAllBucketsUseCase } from '@/application/use-cases/storage/get-all-buckets';

export const createStorageRouter = (storageService: IStorageService) => {
  const router = Router();
  const getAllBucketsUseCase = new GetAllBucketsUseCase(storageService);
  const controller = StorageController.createInstance(getAllBucketsUseCase);

  router.get('/buckets', (req: Request, res: Response) => controller.getBuckets(req, res));

  return router;
};
