import StorageController from '@/infrastructure/controllers/storage';
import { GetAllBucketsUseCase } from '@/application/use-cases/storage/get-all-buckets';
import BackBlazeService from '@/infrastructure/services/back-blaze';
import { env } from '@/infrastructure/config/env';

export const makeStorageController = () => {
  const storageService = new BackBlazeService(env.B2_URL, env.B2_REGION, env.B2_KEY_ID, env.B2_SECRET_KEY);
  const getAllBucketsUseCase = new GetAllBucketsUseCase(storageService);

  return new StorageController(getAllBucketsUseCase);
};
