import { Tag } from '@/domain/models/tag';
import { Repository } from 'typeorm';
import AppDataSource from '@/infrastructure/config/database';
import { Wallpaper } from '@/domain/models/wallpaper';
import { IRegisterWallpaper, IWallpaperRepository } from '@/application/_types/wallpapers/wallpaper.types';

class WallpaperRepository implements IWallpaperRepository {
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
    });

    return await this.repository.save(wallpaper);
  }
}

export default WallpaperRepository;
