import multer from '@/infrastructure/config/multer';

import { Router, type Request, type Response } from 'express';

import { authenticate } from '@/infrastructure/middlewares/auth';
import { makeWallpaperController } from '@/main/factories/wallpaper-controller-factory';

export const createWallpaperRouter = () => {
  const router = Router();

  const controller = makeWallpaperController();

  router.get('/:id/original', (req: Request, res: Response) => controller.getOriginalSize(req, res));

  router.post('/', authenticate, multer.single('wallpaper'), (req: Request, res: Response) =>
    controller.register(req, res),
  );

  return router;
};
