import { Repository } from 'typeorm';
import AppDataSource from '../../../shared/infrastructure/config/database';
import { Wallpaper } from '../../domain/models/wallpaper';
import { IRegisterWallpaper, IWallpaperRepository } from '../../types/wallpaper.types';
import { WallpaperStatus } from '../../types/wallpaper-status.enum';

export default class WallpaperRepository implements IWallpaperRepository {
  private repository: Repository<Wallpaper>;

  constructor() {
    this.repository = AppDataSource.getRepository(Wallpaper);
  }

  async findUrlWithOriginalSizeById(id: string): Promise<string | null> {
    const wallpaper = await this.repository.findOneBy({ id });
    return wallpaper?.originalUrl ?? null;
  }

  async register({
    dto: { name, description, isMature },
    tags,
    originalUrl,
    thumbnailUrl,
    fileSize,
    format,
    userId,
    status,
  }: IRegisterWallpaper): Promise<Wallpaper> {
    const wallpaper = this.repository.create({
      name,
      description,
      isMature: Boolean(isMature),
      originalUrl,
      thumbnailUrl,
      fileSize,
      format,
      tags,
      createdBy: { id: userId },
      updatedBy: { id: userId },
      status,
    });

    return await this.repository.save(wallpaper);
  }

  async updateStatus(id: string, status: WallpaperStatus): Promise<void> {
    await this.repository.update(id, { status });
  }
}
