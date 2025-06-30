import StorageController from '@/infrastructure/controllers/storage';
import { GetAllBucketsUseCase } from '@/application/use-cases/storage/get-all-buckets';
import BackBlazeService from '@/infrastructure/services/back-blaze';

export const makeStorageController = () => {
  const storageService = new BackBlazeService();
  const getAllBucketsUseCase = new GetAllBucketsUseCase(storageService);

  return new StorageController(getAllBucketsUseCase);
};
