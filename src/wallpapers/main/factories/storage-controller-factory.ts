import StorageController from '@wallpapers/infrastructure/controllers/storage';
import { GetAllBucketsUseCase } from '@wallpapers/application/use-cases/get-all-buckets';
import BackBlazeService from '@shared/infrastructure/services/back-blaze';

export const makeStorageController = () => {
  const storageService = new BackBlazeService();
  const getAllBucketsUseCase = new GetAllBucketsUseCase(storageService);

  return new StorageController(getAllBucketsUseCase);
};
