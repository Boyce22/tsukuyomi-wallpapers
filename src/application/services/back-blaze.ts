import { IStorageService } from '@/application/_types/storage/storage.type';

import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';

class BackBlazeService implements IStorageService {
  private s3: S3Client;

  constructor() {
    this.s3 = this._build();
  }

  static createInstance(): BackBlazeService {
    return new BackBlazeService();
  }

  private _build(): S3Client {
    const endpoint = process.env.B2_URL;
    const region = process.env.B2_REGION;
    const accessKeyId = process.env.B2_KEY_ID;
    const secretAccessKey = process.env.B2_SECRET_KEY;

    if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing Backblaze S3 configuration environment variables');
    }

    return new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
    });
  }

  async createBucket(name: string): Promise<void> {
    try {
      await this.s3.send(new CreateBucketCommand({ Bucket: name }));
    } catch (error) {
      console.error(`Failed to create bucket "${name}":`, error);
      throw error;
    }
  }

  async getBuckets(): Promise<string[]> {
    try {
      const { Buckets } = await this.s3.send(new ListBucketsCommand({}));

      if (!Buckets?.length) {
        console.warn('No S3 buckets found.');
        return [];
      }

      return Buckets.map((b) => b.Name).filter((name): name is string => !!name);
    } catch (error) {
      console.error('Failed to list buckets:', error);
      throw error;
    }
  }

  async delete(bucketName: string, key?: string): Promise<void> {
    try {
      if (key) {
        await this.s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
      } else {
        await this.s3.send(new DeleteBucketCommand({ Bucket: bucketName }));
      }
    } catch (error) {
      console.error(`Failed to delete ${key ? `object "${key}"` : `bucket "${bucketName}"`}:`, error);
      throw error;
    }
  }

  async upload(bucketName: string, key: string, fileBuffer: Buffer): Promise<void> {
    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: fileBuffer,
          ContentType: 'application/octet-stream',
        }),
      );
    } catch (error) {
      console.error(`Failed to upload file to bucket "${bucketName}" with key "${key}":`, error);
      throw error;
    }
  }
}

export default BackBlazeService;
