import WallpaperController from '@/infrastructure/controllers/wallpaper';
import { RegisterWallpaperUseCase } from '@/application/use-cases/wallpaper/register-wallpaper';
import { GetOriginalSizeUseCase } from '@/application/use-cases/wallpaper/get-original-size';

import WallpaperService from '@/application/services/wallpaper';
import TagService from '@/application/services/tags';
import ImageCompressService from '@/application/services/image-compress';
import BackBlazeService from '@/application/services/back-blaze';
import DiscordClient from '@/application/services/discord';

import WallpaperRepository from '@/infrastructure/repositories/wallpaper';
import { TagRepository } from '@/infrastructure/repositories/tag';

export const makeWallpaperController = () => {
  const wallpaperRepository = new WallpaperRepository();
  const tagRepository = new TagRepository();

  const wallpaperService = new WallpaperService(wallpaperRepository);
  const tagService = new TagService(tagRepository);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService();
  const discordClient = new DiscordClient();

  const registerWallpaperUseCase = new RegisterWallpaperUseCase(
    wallpaperService,
    tagService,
    imageCompressService,
    storageService,
    discordClient,
  );

  const getOriginalSizeUseCase = new GetOriginalSizeUseCase(wallpaperService);

  return new WallpaperController(registerWallpaperUseCase, getOriginalSizeUseCase);
};
