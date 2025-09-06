import { CursorPage } from '@shared/types/cursor.types';
import { Wallpaper } from '@wallpapers/domain/models/wallpaper';
import { IWallpaperRepository } from '../ports/repositories/wallpaper';

export interface IGetWallpapersUseCase {
    execute(limit: number, cursor: string): Promise<CursorPage<Wallpaper>>
}

export class GetWallpapersUseCase {
  constructor(private readonly wallpaperRepository: IWallpaperRepository) {}

  async execute(limit: number, cursor: string): Promise<CursorPage<Wallpaper>> {
    const wallpapers = await this.wallpaperRepository.findManyWithCursor(limit, cursor);

    const hasMore = wallpapers.length === limit;
    
    return {
      items: wallpapers,
      nextCursor: hasMore ? wallpapers[wallpapers.length - 1].id.toString() : null,
      hasNextPage: hasMore,
    };
  }
}
