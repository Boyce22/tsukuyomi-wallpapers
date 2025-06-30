import { type Wallpaper } from '@/domain/models/wallpaper';

export type TDiscordService = {
  sendWallpaper: (wallpaper: Wallpaper) => Promise<void>;
};
