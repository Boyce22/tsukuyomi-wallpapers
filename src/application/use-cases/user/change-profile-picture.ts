import { IUserRepository } from '@/application/_types/users/user.types';
import { ProfilePictureChangeError } from '@/domain/exceptions/user/profile-picture-change-error';
import { TStorageService } from '@/application/_types/wallpapers/wallpaper.types';
import { TImageCompressorService } from '@/application/_types/wallpapers/wallpaper.types';
import { QualityCompress } from '@/domain/enums/quality.enum';
import { FileRequiredError } from '@/domain/exceptions/common/file-required-error';
import { StorageConfigError } from '@/domain/exceptions/storage/storage-config-error';

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
    bucket: string,
  ) {
    this.repository = repository;
    this.storageService = storageService;
    this.imageCompressorService = imageCompressorService;
    this.bucket = bucket;
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
