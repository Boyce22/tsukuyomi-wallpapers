import { WallpaperStatus } from '@wallpapers/types/wallpaper-status.enum';
import { IWallpaperRepository } from '../ports/repositories/wallpaper';

export class ReportWallpaperUseCase {
  constructor(private readonly wallpaperRepository: IWallpaperRepository) {}

  async execute(wallpaperId: string, reportReason: string): Promise<void> {
    await this.wallpaperRepository.updateStatus(wallpaperId, WallpaperStatus.REPORTED, reportReason);
  }
}
