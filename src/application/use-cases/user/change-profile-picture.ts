import { IUserService } from '@/application/_types/users/user.types';
import { IImageCompressService } from '@/application/_types/compress/compress.type';
import { IStorageService } from '@/application/_types/storage/storage.type';
import { QualityCompress } from '@/application/_types/common/quality.enum';

export interface IChangeProfilePictureUseCase {
  execute(userId: string, file: Express.Multer.File): Promise<string>;
}

export class ChangeProfilePictureUseCase implements IChangeProfilePictureUseCase {
  private readonly userService: IUserService;
  private readonly imageCompress: IImageCompressService;
  private readonly storageService: IStorageService;
  private readonly bucket: string;

  constructor(
    userService: IUserService,
    imageCompress: IImageCompressService,
    storageService: IStorageService,
  ) {
    this.userService = userService;
    this.imageCompress = imageCompress;
    this.storageService = storageService;
    this.bucket = this._resolveBucket();
  }

  private _resolveBucket(): string {
    const bucket = process.env.STORAGE_PROFILE_PICTURE_BUCKET;
    if (!bucket) {
      throw new Error('Missing environment variable: STORAGE_PROFILE_PICTURE_BUCKET');
    }
    return bucket;
  }

  async execute(userId: string, file: Express.Multer.File): Promise<string> {
    const { compressed: profilePicture } = await this.imageCompress.compress({
      path: file.path,
      quality: QualityCompress.MEDIUM,
    });

    const compressedPath = `profile-pictures/${userId}/${file.filename}`;

    await this.storageService.upload(this.bucket, compressedPath, profilePicture.buffer);

    const response = await this.userService.changeProfilePicture(userId, compressedPath);

    return response;
  }
}
