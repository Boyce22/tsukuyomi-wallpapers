import { TStorageService } from '@shared/application/ports/services/storage';

export interface IGetAllBucketsUseCase {
  execute(): Promise<string[]>;
}

export class GetAllBucketsUseCase implements IGetAllBucketsUseCase {
  private readonly storageService: TStorageService;

  constructor(storageService: TStorageService) {
    this.storageService = storageService;
  }

  async execute(): Promise<string[]> {
    const buckets = await this.storageService.getAllBuckets();
    return buckets;
  }
}
