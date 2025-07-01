import multer from '@/infrastructure/config/multer';

import { authenticate } from '@/infrastructure/middlewares/auth';

import { Router, type Request, type Response } from 'express';
import { makeUserController } from '@/main/factories/user-controller-factory';
import { env } from '@/infrastructure/config/env';

export const createUserRouter = () => {
  const router = Router();
  const controller = makeUserController();

  router.post('/', (req: Request, res: Response) => controller.register(req, res));

  router.post('/change-profile-picture', authenticate(env.JWT_SECRET), multer.single('profilePicture'), (req: Request, res: Response) =>
    controller.changeProfilePicture(req, res),
  );

  return router;
};
