import { Tag } from '@/models/tag';
import { Wallpaper } from '@/models/wallpaper';
import type { RegisterWallpaper } from '@/dtos/register-wallpaper';

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(dto: RegisterWallpaper, tags: Tag[]): Promise<Wallpaper>;
}
