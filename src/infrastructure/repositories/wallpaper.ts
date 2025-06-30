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

  async register({ dto, tags, originalUrl, thumbnailUrl, fileSize, format }: IRegisterWallpaper): Promise<Wallpaper> {
    const wallpaper = this.repository.create({
      name: dto.name,
      description: dto.description,
      isMature: dto.isMature,
      originalUrl,
      thumbnailUrl,
      tags,
      fileSize,
      format,
    });

    return await this.repository.save(wallpaper);
  }
}

export default WallpaperRepository;
