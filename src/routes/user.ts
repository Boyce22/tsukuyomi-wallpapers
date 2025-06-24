import multer from '@/config/multer';

import UserController from '@/controllers/user';

import { authenticate } from '@/middlewares/auth';

import { IUserService } from '@/_types/users/user.types';
import { IAuthService, IHashProvider } from '@/_types/auth/auth.type';

import { Router, type Request, type Response } from 'express';
import { IStorageService } from '@/_types/storage/storage.type';
import { IImageCompressService } from '@/_types/compress/compress.type';

export const createUserRouter = (
  service: IUserService,
  hashProvider: IHashProvider,
  authService: IAuthService,
  imageCompress: IImageCompressService,
  storageService: IStorageService,
) => {
  const router = Router();
  const controller = UserController.createInstance(service, authService, hashProvider, imageCompress, storageService);

  router.post('/', (req: Request, res: Response) => controller.register(req, res));

 TSU-002
  router.post('/', multer.single('photo'), (req: Request, res: Response) => controller.register(req, res));
  router.patch('/name/:id', (req: Request, res: Response, next) => controller.updateName(req, res, next));

  router.post('/change-profile-picture', authenticate, multer.single('profilePicture'), (req: Request, res: Response) =>
    controller.changeProfilePicture(req, res),
  );
 develop

  return router;
};
