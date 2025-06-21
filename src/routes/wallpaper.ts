import { Router, type Request, type Response } from 'express';

import { ITagService } from '@/_types/tags/tag.type';
import WallpaperController from '@/controllers/wallpapers';
import { IWallpaperService } from '@/_types/wallpapers/wallpaper.types';
import { IImageCompressService } from '@/_types/compress/compress.type';
import multer from '@/config/multer';
import { IStorageService } from '@/_types/storage/storage.type';

type ConstructorParams = {
  wallpaperService: IWallpaperService;
  tagService: ITagService;
  imageCompressService: IImageCompressService;
  storageService: IStorageService;
};

export const createWallpaperRouter = (params: ConstructorParams) => {
  const router = Router();
  const controller = WallpaperController.createInstance(params);

  router.post('/', multer.single('file'), (req: Request, res: Response) => controller.register(req, res));
  router.get('/:id/original', (req: Request, res: Response) => controller.getOriginalSize(req, res));

  return router;
};
