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

export interface IRegisterWallpaper {
  dto: CreateWallpaper,
  tags: Tag[],
  originalUrl: string,
  thumbnailUrl: string,
  fileSize: number,
  format: string
}

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(params: IRegisterWallpaper): Promise<Wallpaper>;
}
