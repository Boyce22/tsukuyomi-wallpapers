import type { Request, Response } from 'express';
import { IGetAllBucketsUseCase } from '@/application/use-cases/storage/get-all-buckets';

class StorageController {
  private readonly getAllBucketsUseCase: IGetAllBucketsUseCase;

  constructor(getAllBucketsUseCase: IGetAllBucketsUseCase) {
    this.getAllBucketsUseCase = getAllBucketsUseCase;
  }

  async getBuckets(req: Request, res: Response): Promise<void> {
    const buckets = await this.getAllBucketsUseCase.execute();

    res.status(200).json({ buckets });
  }
}

export default StorageController;
