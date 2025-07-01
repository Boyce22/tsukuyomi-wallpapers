import multer from '@/infrastructure/config/multer';

import { Router, type Request, type Response } from 'express';

import { authenticate } from '@/infrastructure/middlewares/auth';
import { makeWallpaperController } from '@/main/factories/wallpaper-controller-factory';
import { env } from '@/infrastructure/config/env';

export const createWallpaperRouter = () => {
  const router = Router();

  const controller = makeWallpaperController();

  router.get('/:id/original', (req: Request, res: Response) => controller.getOriginalSize(req, res));

  router.post('/', authenticate(env.JWT_SECRET), multer.single('wallpaper'), (req: Request, res: Response) =>
    controller.register(req, res),
  );

  return router;
};
