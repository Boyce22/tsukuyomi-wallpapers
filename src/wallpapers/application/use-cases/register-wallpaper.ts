import { v4 as uuidv4 } from 'uuid';
import { QualityCompress } from '../../../shared/types/quality.enum';
import { TImageCompressorService } from '../../../shared/application/ports/services/image-compressor';
import { TStorageService } from '../../../shared/application/ports/services/storage';
import { IFindAllTagsByIdsUseCase } from '@tags/application/use-cases/find-all-tags-by-ids';
import { CreateWallpaper, IWallpaperRepository } from '@wallpapers/types/wallpaper.types';
import { WallpaperStatus } from '@wallpapers/types/wallpaper-status.enum';
import { TDiscordService } from '../../../shared/application/ports/services/discord';
import { StorageConfigError } from '../../../shared/domain/exceptions/storage-config-error';
import { FileRequiredError } from '../../../shared/domain/exceptions/file-required-error';
import { InvalidTagsError } from '../../../tags/domain/exceptions/invalid-tags-error';
import { WallpaperRegistrationError } from '@wallpapers/domain/exceptions/wallpaper-registration-error';

export interface IRegisterWallpaperUseCase {
  execute(params: { file: Express.Multer.File; userId: string; dto: CreateWallpaper }): Promise<string>;
}

export class RegisterWallpaperUseCase {
  private readonly wallpaperRepository: IWallpaperRepository;
  private readonly tagService: IFindAllTagsByIdsUseCase;
  private readonly imageCompressService: TImageCompressorService;
  private readonly storageService: TStorageService;
  private readonly discordClient: TDiscordService;
  private readonly bucket: string;

  constructor(
    wallpaperRepository: IWallpaperRepository,
    tagService: IFindAllTagsByIdsUseCase,
    imageCompressService: TImageCompressorService,
    storageService: TStorageService,
    discordClient: TDiscordService,
  ) {
    this.wallpaperRepository = wallpaperRepository;
    this.tagService = tagService;
    this.imageCompressService = imageCompressService;
    this.storageService = storageService;
    this.discordClient = discordClient;
    this.bucket = this._resolveBucket();
  }

  private _resolveBucket(): string {
    const bucket = process.env.STORAGE_WALLPAPER_BUCKET;
    if (!bucket) {
      throw new StorageConfigError('Missing environment variable: STORAGE_WALLPAPER_BUCKET');
    }
    return bucket;
  }

  async execute(params: { file: Express.Multer.File; userId: string; dto: CreateWallpaper }): Promise<string> {
    const { file, userId, dto } = params;

    if (!file) {
      throw new FileRequiredError('File is required');
    }

    if (!Array.isArray(dto.tagsIDs) || dto.tagsIDs.length === 0) {
      throw new InvalidTagsError('`tagsIDs` must be a non-empty array');
    }

    const tags = await this.tagService.execute(dto.tagsIDs);

    const uploadIdentifier = uuidv4(); // Unique identifier for file names in storage, not the database ID.

    try {
      const compressedImage = await this.imageCompressService.compress(
        file.buffer,
        QualityCompress.MEDIUM,
        file.mimetype,
      );

      const mimeType = compressedImage.mimeType.split('/')[1];

      const originalUrl = `wallpapers/${userId}/${uploadIdentifier}-full.${mimeType}`;
      const thumbnailUrl = `wallpapers/${userId}/${uploadIdentifier}-compress.${mimeType}`;

      await this.storageService.upload({
        bucket: this.bucket,
        key: originalUrl,
        buffer: file.buffer,
        mimeType: file.mimetype,
      });

      await this.storageService.upload({
        bucket: this.bucket,
        key: thumbnailUrl,
        buffer: compressedImage.buffer,
        mimeType: compressedImage.mimeType,
      });

      const created = await this.wallpaperRepository.register({
        dto,
        tags,
        userId,
        originalUrl,
        thumbnailUrl,
        fileSize: file.size,
        format: mimeType,
        status: WallpaperStatus.PENDING,
      });

      console.log(`Created wallpaper with ID: ${created.id}`);

      await this.discordClient.sendWallpaper({
        userId,
        file: {
          buffer: compressedImage.buffer,
          name: file.originalname,
        },
        wallpaper: created,
      });

      return 'Upload successful. Admins will review your wallpaper.';
    } catch (error) {
      throw new WallpaperRegistrationError('Failed to upload wallpaper.');
    }
  }
}
