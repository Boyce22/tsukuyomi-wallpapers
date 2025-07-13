import fs from 'fs/promises';
import { IUserRepository } from '@users/types/user.types';
import { QualityCompress } from '@shared/types/quality.enum';
import { TStorageService } from '@shared/application/ports/services/storage';
import { TImageCompressorService } from '@shared/application/ports/services/image-compressor';
import { StorageConfigError } from '@shared/domain/exceptions/storage-config-error';
import { BannerPictureChangeError } from '@users/domain/exceptions/banner-picture-change-error';

export interface IChangeProfileBannerUseCase {
  execute(id: string, banner: Express.Multer.File): Promise<string>;
}

export class ChangeProfileBannerUseCase implements IChangeProfileBannerUseCase {
  private readonly bucket: string;

  private readonly repository: IUserRepository;

  private readonly storageService: TStorageService;

  private readonly imageCompressorService: TImageCompressorService;

  constructor(
    repository: IUserRepository,
    storageService: TStorageService,
    imageCompressorService: TImageCompressorService,
  ) {
    this.repository = repository;
    this.storageService = storageService;
    this.imageCompressorService = imageCompressorService;
    this.bucket = this._resolveBucket();
  }

  private _resolveBucket(): string {
    const bucket = process.env.STORAGE_PROFILE_BANNER_BUCKET;

    if (!bucket) {
      throw new StorageConfigError('Missing environment variable: STORAGE_PROFILE_BANNER_BUCKET');
    }

    return bucket;
  }

  async execute(id: string, banner: Express.Multer.File): Promise<string> {
    try {
      const compressBanner = await this.imageCompressorService.compress(
        banner.path,
        QualityCompress.LOW,
        banner.mimetype,
      );

      const key = `profile-banners/${id}/${banner.filename}`;

      await this.storageService.upload({
        key,
        bucket: this.bucket,
        buffer: compressBanner.buffer,
        mimeType: compressBanner.mimeType,
      });

      await this.repository.changeProfileBanner(id, key);

      return 'Profile banner changed successfully';
    } catch (error) {
      console.error('Error changing profile banner:', error);
      throw new BannerPictureChangeError('Failed to change profile banner.');
    } finally {
      fs.unlink(banner.path);
    }
  }
}
