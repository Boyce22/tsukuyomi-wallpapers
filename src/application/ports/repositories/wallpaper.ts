import { Wallpaper } from '@/domain/models/wallpaper';
import { IRegisterWallpaper } from '@/application/_types/wallpapers/wallpaper.types';
import { WallpaperStatus } from '@/application/_types/wallpapers/wallpaper-status.enum';

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(params: IRegisterWallpaper): Promise<Wallpaper>;
  updateStatus(id: string, status: WallpaperStatus): Promise<void>;
}
