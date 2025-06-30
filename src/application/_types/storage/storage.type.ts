export interface IStorageService {
  createBucket(name: string): Promise<void>;
  delete(bucketName: string, key?: string): Promise<void>;
  upload(bucketName: string, key: string, fileBuffer: Buffer): Promise<void>;
  getBuckets(): Promise<string[]>;
}
