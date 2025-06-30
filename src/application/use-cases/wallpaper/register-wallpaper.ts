import { QualityCompress } from '@/application/_types/common/quality.enum';
import { IImageCompressService } from '@/application/_types/compress/compress.type';
import { IStorageService } from '@/application/_types/storage/storage.type';
import { ITagService } from '@/application/_types/tags/tag.type';
import { CreateWallpaper, IWallpaperService } from '@/application/_types/wallpapers/wallpaper.types';
import DiscordClient from '@/application/services/discord';

export interface IRegisterWallpaperUseCase {
  execute(params: {
    file: Express.Multer.File;
    userId: string;
    dto: CreateWallpaper;
  }): Promise<string>;
}

export class RegisterWallpaperUseCase {
  private readonly wallpaperService: IWallpaperService;
  private readonly tagService: ITagService;
  private readonly imageCompressService: IImageCompressService;
  private readonly storageService: IStorageService;
  private readonly discordClient: DiscordClient;
  private readonly bucket: string;

  constructor(
    wallpaperService: IWallpaperService,
    tagService: ITagService,
    imageCompressService: IImageCompressService,
    storageService: IStorageService,
    discordClient: DiscordClient,
  ) {
    this.wallpaperService = wallpaperService;
    this.tagService = tagService;
    this.imageCompressService = imageCompressService;
    this.storageService = storageService;
    this.discordClient = discordClient;
    this.bucket = this._resolveBucket();
  }

  private _resolveBucket(): string {
    const bucket = process.env.STORAGE_WALLPAPER_BUCKET;
    if (!bucket) {
      throw new Error('Missing environment variable: STORAGE_WALLPAPER_BUCKET');
    }
    return bucket;
  }

  async execute(params: { file: Express.Multer.File; userId: string; dto: CreateWallpaper }): Promise<string> {
    const { file, userId, dto } = params;

    if (!file) {
      throw new Error('File is required');
    }

    if (!Array.isArray(dto.tagsIDs) || dto.tagsIDs.length === 0) {
      throw new Error('`tagsIDs` must be a non-empty array');
    }

    const tags = await this.tagService.findAllByIds(dto.tagsIDs);

    const { original, compressed } = await this.imageCompressService.compress({
      path: file.path,
      quality: QualityCompress.MEDIUM,
    });

    this.discordClient.requestApproval({
      image: compressed,
      userId,
    });

    const compressedPath = `wallpapers/${userId}/${file.filename}-comp`;
    const originalPath = `wallpapers/${userId}/${file.filename}-orig`;

    await Promise.all([
      this.storageService.upload(this.bucket, originalPath, original.buffer),
      this.storageService.upload(this.bucket, compressedPath, compressed.buffer),
    ]);

    const created = await this.wallpaperService.register(dto, tags);

    return created.id;
  }
}
