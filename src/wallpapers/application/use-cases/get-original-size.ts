import { UrlNotFound } from '../../../shared/domain/exceptions/url-not-found';
import { UrlNotProvided } from '../../../shared/domain/exceptions/url-not-provided';
import { IWallpaperRepository } from '../ports/repositories/wallpaper';

export interface IGetOriginalSizeUseCase {
  execute(id: string): Promise<string>;
}

export class GetOriginalSizeUseCase implements IGetOriginalSizeUseCase {
  private readonly repository: IWallpaperRepository;

  constructor(repository: IWallpaperRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<string> {
    if (!id || !id.trim()) {
      throw new UrlNotProvided('Wallpaper ID must be provided.');
    }

    const url = await this.repository.findUrlWithOriginalSizeById(id);

    if (!url) {
      throw new UrlNotFound('Original image URL not found for the provided ID.', id);
    }

    return url;
  }
}

export default GetOriginalSizeUseCase;
