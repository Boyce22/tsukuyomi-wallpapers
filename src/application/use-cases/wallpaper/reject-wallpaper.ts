import { WallpaperStatus } from '@/application/_types/wallpapers/wallpaper-status.enum';
import { IWallpaperRepository } from '@/application/ports/repositories/wallpaper';

export class RejectWallpaperUseCase {
  constructor(private readonly wallpaperRepository: IWallpaperRepository) {}

  async execute(wallpaperId: string): Promise<void> {
    await this.wallpaperRepository.updateStatus(wallpaperId, WallpaperStatus.REJECTED);
  }
}
