import { Wallpaper } from '@wallpapers/domain/models/wallpaper';
import { IRegisterWallpaper } from '@wallpapers/types/wallpaper.types';
import { WallpaperStatus } from '@wallpapers/types/wallpaper-status.enum';

export interface IWallpaperRepository {
  findManyWithCursor(limit: number, cursor: string): Promise<Wallpaper[]>;
  findUrlWithOriginalSizeById(id: number): Promise<string | null>;
  register(params: IRegisterWallpaper): Promise<Wallpaper>;
  updateStatus(id: string, status: WallpaperStatus, reportReason?: string): Promise<void>;
}
