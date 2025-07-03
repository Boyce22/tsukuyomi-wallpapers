import { IUserRepository } from '../../types/user.types';
import { ProfilePictureChangeError } from '@users/domain/exceptions/profile-picture-change-error';
import { TStorageService } from '@shared/application/ports/services/storage';
import { TImageCompressorService } from '@shared/application/ports/services/image-compressor';
import { QualityCompress } from '@shared/types/quality.enum';
import { FileRequiredError } from '@shared/domain/exceptions/file-required-error';
import { StorageConfigError } from '@shared/domain/exceptions/storage-config-error';

export interface IChangeProfilePictureUseCase {
  execute(id: string, file: { buffer: Buffer; mimetype: string; originalname: string }): Promise<string>;
}

export class ChangeProfilePictureUseCase implements IChangeProfilePictureUseCase {
  private readonly repository: IUserRepository;
  private readonly storageService: TStorageService;
  private readonly imageCompressorService: TImageCompressorService;
  private readonly bucket: string;

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
    const bucket = process.env.STORAGE_PROFILE_PICTURE_BUCKET;

    if (!bucket) {
      throw new StorageConfigError('Missing environment variable: STORAGE_PROFILE_PICTURE_BUCKET');
    }

    return bucket;
  }

  async execute(id: string, file: { buffer: Buffer; mimetype: string; originalname: string }): Promise<string> {
    if (!file) {
      throw new FileRequiredError('File is required');
    }

    try {
      const compressedImage = await this.imageCompressorService.compress(
        file.buffer,
        QualityCompress.MEDIUM,
        file.mimetype,
      );

      const fileName = `${Date.now()}-${file.originalname}`;

      const key = `profile-pictures/${id}/${fileName}`;

      await this.storageService.upload({
        key,
        bucket: this.bucket,
        buffer: compressedImage.buffer,
        mimeType: compressedImage.mimeType,
      });

      await this.repository.changeProfilePicture(id, key);
      return 'Profile picture changed successfully';
    } catch (error) {
      console.error('Error changing profile picture:', error);
      throw new ProfilePictureChangeError('Failed to change profile picture.');
    }
  }
}

export default ChangeProfilePictureUseCase;
