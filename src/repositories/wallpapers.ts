import { Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { Wallpaper } from '@/models/wallpaper';
import type { IWallpapersRepository } from '@/_types/repositories/wallpapers';

class WallpapersRepository implements IWallpapersRepository {
  private repository: Repository<Wallpaper>;

  constructor() {
    this.repository = AppDataSource.getRepository(Wallpaper);
  }

  static createInstance(): WallpapersRepository {
    return new WallpapersRepository();
  }

  findUrlWithOriginalSizeById = async (id: string): Promise<string | null> => {
    const wallpaper = await this.repository.findOneBy({
      id,
    });

    if (!wallpaper) return null;

    return wallpaper.originalUrl;
  };
}

export default WallpapersRepository;
