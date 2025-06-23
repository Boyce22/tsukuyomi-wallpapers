import multer from '@/config/multer';

import UserController from '@/controllers/user';

import { IUserService } from '@/_types/users/user.types';
import { IAuthService, IHashProvider } from '@/_types/auth/auth.type';

import { Router, type Request, type Response } from 'express';

export const createUserRouter = (service: IUserService, hashProvider: IHashProvider, authService: IAuthService) => {
  const router = Router();
  const controller = UserController.createInstance(service, authService, hashProvider);

  router.post('/', multer.single('photo'), (req: Request, res: Response) => controller.register(req, res));
  router.patch('/name/:id', (req: Request, res: Response, next) => controller.updateName(req, res, next));

  return router;
};
