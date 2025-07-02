import StorageController from '@shared/infrastructure/controllers/storage';
import { GetAllBucketsUseCase } from '@shared/application/use-cases/get-all-buckets';
import BackBlazeService from '@shared/infrastructure/services/back-blaze';

export const makeStorageController = () => {
  const storageService = new BackBlazeService();
  const getAllBucketsUseCase = new GetAllBucketsUseCase(storageService);

  return new StorageController(getAllBucketsUseCase);
};
