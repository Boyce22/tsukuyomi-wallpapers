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

export interface IWallpaperService {
  getOriginalSize(id: string): Promise<string>;
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}
