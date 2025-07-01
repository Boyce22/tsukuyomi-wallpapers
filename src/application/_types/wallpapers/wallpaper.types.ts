import { Tag } from '@/domain/models/tag';
import { Wallpaper } from '@/domain/models/wallpaper';

import { Wallpaper } from '@/domain/models/wallpaper';

export interface IFile {
  buffer: Buffer;
  name: string;
}

export type TDiscordService = {
  sendWallpaper: ({ file, userId, wallpaper }: { file: IFile; userId: string; wallpaper: Wallpaper }) => Promise<void>;
  onApprove: (interaction: any) => Promise<void>;
  onReject: (interaction: any) => Promise<void>;
};

export interface CreateWallpaper {
  name: string;
  description?: string;
  isMature?: boolean;
  tagsIDs: string[];
}

import { WallpaperStatus } from '@/domain/enums/wallpaper-status.enum';
import { QualityCompress } from '@/domain/enums/quality.enum';

export interface IRegisterWallpaper {
  dto: CreateWallpaper;
  tags: Tag[];
  originalUrl: string;
  thumbnailUrl: string;
  isMature?: boolean;
  fileSize: number;
  format: string;
  userId: string;
  status: WallpaperStatus;
}

export type TImageCompressorService = {
  compress: (
    image: Buffer,
    quality: QualityCompress,
    originalMimeType: string,
  ) => Promise<{ buffer: Buffer; mimeType: string }>;
};

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(params: IRegisterWallpaper): Promise<Wallpaper>;
  updateStatus(id: string, status: WallpaperStatus): Promise<void>;
}

export type TStorageService = {
  upload: (params: { bucket: string; key: string; buffer: Buffer; mimeType: string }) => Promise<void>;
  getAllBuckets: () => Promise<any>;
};
