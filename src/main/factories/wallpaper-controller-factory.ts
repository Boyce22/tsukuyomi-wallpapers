import WallpaperController from '@/infrastructure/controllers/wallpaper';
import { RegisterWallpaperUseCase } from '@/application/use-cases/wallpaper/register-wallpaper';
import { GetOriginalSizeUseCase } from '@/application/use-cases/wallpaper/get-original-size';

import { FindAllTagsByIdsUseCase } from '@/application/use-cases/tag/find-all-tags-by-ids';
import ImageCompressService from '@/infrastructure/services/image-compress';
import BackBlazeService from '@/infrastructure/services/back-blaze';
import DiscordClient from '@/infrastructure/services/discord';

import WallpaperRepository from '@/infrastructure/repositories/wallpaper';
import { TagRepository } from '@/infrastructure/repositories/tag';

export const makeWallpaperController = () => {
  const wallpaperRepository = new WallpaperRepository();
  const tagRepository = new TagRepository();
  const findAllTagsByIdsUseCase = new FindAllTagsByIdsUseCase(tagRepository);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService();
  const discordClient = new DiscordClient();

  const registerWallpaperUseCase = new RegisterWallpaperUseCase(
    wallpaperRepository,
    findAllTagsByIdsUseCase,
    imageCompressService,
    storageService,
    discordClient,
  );

  const getOriginalSizeUseCase = new GetOriginalSizeUseCase(wallpaperRepository);

  return new WallpaperController(registerWallpaperUseCase, getOriginalSizeUseCase);
};
