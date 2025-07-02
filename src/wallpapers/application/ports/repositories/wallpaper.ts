import { Wallpaper } from '@wallpapers/domain/models/wallpaper';
import { IRegisterWallpaper } from '@wallpapers/types/wallpaper.types';
import { WallpaperStatus } from '@wallpapers/types/wallpaper-status.enum';

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(params: IRegisterWallpaper): Promise<Wallpaper>;
  updateStatus(id: string, status: WallpaperStatus): Promise<void>;
}
