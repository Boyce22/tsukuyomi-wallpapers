import { IWallpaperService } from '@/application/_types/wallpapers/wallpaper.types';
import { UrlNotFound } from '@/domain/exceptions/url-not-found';
import { UrlNotProvided } from '@/domain/exceptions/url-not-provided';

export interface IGetOriginalSizeUseCase {
  execute(id: string): Promise<string>;
}

export class GetOriginalSizeUseCase implements IGetOriginalSizeUseCase {
  private readonly wallpaperService: IWallpaperService;

  constructor(wallpaperService: IWallpaperService) {
    this.wallpaperService = wallpaperService;
  }

  async execute(id: string): Promise<string> {
    if (!id || !id.trim()) {
      throw new UrlNotProvided('Wallpaper ID must be provided.');
    }

    const url = await this.wallpaperService.getOriginalSize(id);

    if (!url) {
      throw new UrlNotFound('Original image URL not found for the provided ID.', id);
    }

    return url;
  }
}
