import { Repository } from 'typeorm';
import AppDataSource from '@/infrastructure/config/database';
import { WallpaperEntity } from '@/infrastructure/entities/wallpaper.entity';
import { Wallpaper } from '@/domain/models/wallpaper';
import { IRegisterWallpaper, IWallpaperRepository } from '@/application/_types/wallpapers/wallpaper.types';
import { WallpaperStatus } from '@/domain/enums/wallpaper-status.enum';
import { User } from '@/domain/models/user';
import { Tag } from '@/domain/models/tag';

export default class WallpaperRepository implements IWallpaperRepository {
  private repository: Repository<WallpaperEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(WallpaperEntity);
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
    const wallpaperEntity = this.repository.create({
      name,
      description,
      isMature: Boolean(isMature),
      originalUrl,
      thumbnailUrl,
      fileSize,
      format,
      tags: tags.map(tag => ({ id: tag.id })),
      createdBy: { id: userId },
      updatedBy: { id: userId },
      status,
    });

    const savedEntity = await this.repository.save(wallpaperEntity);

    const createdWallpaper = new Wallpaper();
    createdWallpaper.id = savedEntity.id;
    createdWallpaper.name = savedEntity.name;
    createdWallpaper.description = savedEntity.description;
    createdWallpaper.originalUrl = savedEntity.originalUrl;
    createdWallpaper.thumbnailUrl = savedEntity.thumbnailUrl;
    createdWallpaper.isMature = savedEntity.isMature;
    createdWallpaper.isActive = savedEntity.isActive;
    createdWallpaper.status = savedEntity.status;
    createdWallpaper.createdAt = savedEntity.createdAt;
    createdWallpaper.updatedAt = savedEntity.updatedAt;
    createdWallpaper.fileSize = savedEntity.fileSize;
    createdWallpaper.format = savedEntity.format;
    createdWallpaper.viewCount = savedEntity.viewCount;
    createdWallpaper.downloadCount = savedEntity.downloadCount;

    if (savedEntity.createdBy) {
      createdWallpaper.createdBy = new User();
      createdWallpaper.createdBy.id = savedEntity.createdBy.id;
    }
    if (savedEntity.updatedBy) {
      createdWallpaper.updatedBy = new User();
      createdWallpaper.updatedBy.id = savedEntity.updatedBy.id;
    }
    if (savedEntity.tags) {
      createdWallpaper.tags = savedEntity.tags.map(tagEntity => {
        const tag = new Tag();
        tag.id = tagEntity.id;
        tag.name = tagEntity.name;
        tag.description = tagEntity.description;
        return tag;
      });
    }

    return createdWallpaper;
  }

  async updateStatus(id: string, status: WallpaperStatus): Promise<void> {
    await this.repository.update(id, { status });
  }
}
