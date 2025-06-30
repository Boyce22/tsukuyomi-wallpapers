import { Tag } from '@/domain/models/tag';
import { UrlNotFound } from '@/domain/exceptions/url-not-found';
import { UrlNotProvided } from '@/domain/exceptions/url-not-provided';

import { Wallpaper } from '@/domain/models/wallpaper';
import { CreateWallpaper, IWallpaperRepository, IWallpaperService } from '@/application/_types/wallpapers/wallpaper.types';
import { WallpaperRegistrationError } from '@/domain/exceptions/wallpaper-registration-error';

class WallpaperService implements IWallpaperService {
  private readonly repository: IWallpaperRepository;

  constructor(repository: IWallpaperRepository) {
    this.repository = repository;
  }

  async getOriginalSize(id: string): Promise<string> {
    if (!id || !id.trim()) {
      throw new UrlNotProvided('Wallpaper ID must be provided.');
    }

    const url = await this.repository.findUrlWithOriginalSizeById(id);

    if (!url) {
      throw new UrlNotFound('Original image URL not found for the provided ID.', id);
    }

    return url;
  }

  async register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper> {
    try {
      return await this.repository.register(dto, tags);
    } catch (error) {
      console.error('Error registering wallpaper:', error);
      throw new WallpaperRegistrationError('Failed to register wallpaper.');
    }
  }
}

export default WallpaperService;
