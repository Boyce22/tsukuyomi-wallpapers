import multer from '@/config/multer';

import { Router, type Request, type Response } from 'express';

import { ITagService } from '@/_types/tags/tag.type';
import WallpaperController from '@/controllers/wallpaper';
import { IWallpaperService } from '@/_types/wallpapers/wallpaper.types';
import { IImageCompressService } from '@/_types/compress/compress.type';

import { IStorageService } from '@/_types/storage/storage.type';
import { authenticate } from '@/middlewares/auth';

type ConstructorParams = {
  wallpaperService: IWallpaperService;
  tagService: ITagService;
  imageCompressService: IImageCompressService;
  storageService: IStorageService;
};

export const createWallpaperRouter = (params: ConstructorParams) => {
  const router = Router();
  const controller = WallpaperController.createInstance(params);

  router.get('/:id/original', (req: Request, res: Response) => controller.getOriginalSize(req, res));

  router.post('/', authenticate, multer.single('wallpaper'), (req: Request, res: Response) => controller.register(req, res));

  return router;
};
