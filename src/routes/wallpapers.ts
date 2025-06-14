import { Router, type Request, type Response } from 'express';

import type { ITagService } from '@/_types/services/tags';
import WallpaperController from '@/controllers/wallpapers';
import type { IWallpaperService } from '@/_types/services/wallpapers';

export const createWallpapersRouter = (wallpaperService: IWallpaperService, tagService: ITagService) => {
  const router = Router();
  const controller = WallpaperController.createInstance(wallpaperService, tagService);

  router.post('/', (req: Request, res: Response) => controller.register(req, res));
  router.get('/:id/original', (req: Request, res: Response) => controller.getOriginalSize(req, res));

  return router;
};
