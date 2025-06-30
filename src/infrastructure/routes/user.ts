import multer from '@/infrastructure/config/multer';

import UserController from '@/infrastructure/controllers/user';

import { authenticate } from '@/infrastructure/middlewares/auth';

import { IUserService } from '@/application/_types/users/user.types';
import { IAuthService } from '@/application/_types/auth/auth.type';
import { RegisterUserUseCase } from '@/application/use-cases/user/register-user';
import { ChangeProfilePictureUseCase } from '@/application/use-cases/user/change-profile-picture';
import { IImageCompressService } from '@/application/_types/compress/compress.type';
import { IStorageService } from '@/application/_types/storage/storage.type';

import { Router, type Request, type Response } from 'express';

export const createUserRouter = (
  userService: IUserService,
  authService: IAuthService,
  imageCompressService: IImageCompressService,
  storageService: IStorageService,
) => {
  const router = Router();
  const registerUserUseCase = new RegisterUserUseCase(userService, authService);
  const changeProfilePictureUseCase = new ChangeProfilePictureUseCase(userService, imageCompressService, storageService);
  const controller = UserController.createInstance(userService, registerUserUseCase, changeProfilePictureUseCase);

  router.post('/', (req: Request, res: Response) => controller.register(req, res));

  router.post('/change-profile-picture', authenticate, multer.single('profilePicture'), (req: Request, res: Response) =>
    controller.changeProfilePicture(req, res),
  );

  return router;
};
