import { Tag } from '@/domain/models/tag';
import { Repository } from 'typeorm';
import AppDataSource from '@/infrastructure/config/database';
import { Wallpaper } from '@/domain/models/wallpaper';
import { CreateWallpaper, IWallpaperRepository } from '@/application/_types/wallpapers/wallpaper.types';

class WallpaperRepository implements IWallpaperRepository {
  private repository: Repository<Wallpaper>;

  constructor() {
    this.repository = AppDataSource.getRepository(Wallpaper);
  }

  async findUrlWithOriginalSizeById(id: string): Promise<string | null> {
    const wallpaper = await this.repository.findOneBy({ id });
    return wallpaper?.originalUrl ?? null;
  }

  async register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper> {
    const wallpaper = this.repository.create({
      name: dto.name,
      description: dto.description,
      isMature: dto.isMature,
      tags,
    });

    return await this.repository.save(wallpaper);
  }
}

export default WallpaperRepository;
