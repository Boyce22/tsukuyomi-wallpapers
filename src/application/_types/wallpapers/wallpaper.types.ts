import { Request } from 'express';
import { Tag } from '@/domain/models/tag';
import { Wallpaper } from '@/domain/models/wallpaper';

export interface CreateWallpaper {
  name: string;
  description?: string;
  isMature?: boolean;
  tagsIDs: string[];
}

export interface CreateWallpaperRequest extends Request {
  file?: Express.Multer.File;
  body: CreateWallpaper;
}

import { WallpaperStatus } from './wallpaper-status.enum';

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

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(params: IRegisterWallpaper): Promise<Wallpaper>;
  updateStatus(id: string, status: WallpaperStatus): Promise<void>;
}
