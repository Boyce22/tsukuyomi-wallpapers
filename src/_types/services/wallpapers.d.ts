import { Wallpaper } from '@/models/wallpaper';
import type { RegisterWallpaper } from '@/dtos/register-wallpaper';

export interface IWallpaperService {
  getOriginalSize(id: string): Promise<string>;
  register(dto: RegisterWallpaper, tags: Tag[]): Promise<string>;
}
