import multer from '@/infrastructure/config/multer';

import { Router, type Request, type Response } from 'express';

import WallpaperController from '@/infrastructure/controllers/wallpaper';
import { IWallpaperService } from '@/application/_types/wallpapers/wallpaper.types';
import { RegisterWallpaperUseCase } from '@/application/use-cases/wallpaper/register-wallpaper';
import { GetOriginalSizeUseCase } from '@/application/use-cases/wallpaper/get-original-size';
import { ITagService } from '@/application/_types/tags/tag.type';
import { IImageCompressService } from '@/application/_types/compress/compress.type';
import { IStorageService } from '@/application/_types/storage/storage.type';
import DiscordClient from '@/application/services/discord';

import { authenticate } from '@/infrastructure/middlewares/auth';

export const createWallpaperRouter = (
  wallpaperService: IWallpaperService,
  tagService: ITagService,
  imageCompressService: IImageCompressService,
  storageService: IStorageService,
) => {
  const router = Router();

  const discordClient = new DiscordClient();

  const registerWallpaperUseCase = new RegisterWallpaperUseCase(
    wallpaperService,
    tagService,
    imageCompressService,
    storageService,
    discordClient,
  );

  const getOriginalSizeUseCase = new GetOriginalSizeUseCase(wallpaperService);

  const controller = WallpaperController.createInstance(registerWallpaperUseCase, getOriginalSizeUseCase);

  router.get('/:id/original', (req: Request, res: Response) => controller.getOriginalSize(req, res));

  router.post('/', authenticate, multer.single('wallpaper'), (req: Request, res: Response) => controller.register(req, res));

  return router;
};
