import { Tag } from './tag';
import { User } from '././user';
import { WallpaperStatus } from '@/domain/enums/wallpaper-status.enum';

export class Wallpaper {
  id!: string;
  name!: string;
  description?: string;
  originalUrl!: string;
  thumbnailUrl!: string;
  isMature!: boolean;
  isActive!: boolean;
  status!: WallpaperStatus;
  createdAt!: Date;
  updatedAt!: Date;
  fileSize?: number;
  format?: string;
  viewCount!: number;
  downloadCount!: number;
  createdBy?: User;
  updatedBy?: User;
  tags!: Tag[];
}