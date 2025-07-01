import { WallpaperStatus } from '@/domain/enums/wallpaper-status.enum';
import { IWallpaperRepository } from '@/application/_types/wallpapers/wallpaper.types';

export class RejectWallpaperUseCase {
  constructor(private readonly wallpaperRepository: IWallpaperRepository) {}

  async execute(wallpaperId: string): Promise<void> {
    await this.wallpaperRepository.updateStatus(wallpaperId, WallpaperStatus.REJECTED);
  }
}
