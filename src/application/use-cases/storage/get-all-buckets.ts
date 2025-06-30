import { IStorageService } from '@/application/_types/storage/storage.type';

export interface IGetAllBucketsUseCase {
  execute(): Promise<string[]>;
}

export class GetAllBucketsUseCase implements IGetAllBucketsUseCase {
  private readonly storageService: IStorageService;

  constructor(storageService: IStorageService) {
    this.storageService = storageService;
  }

  async execute(): Promise<string[]> {
    const buckets = await this.storageService.getBuckets();
    return buckets;
  }
}
