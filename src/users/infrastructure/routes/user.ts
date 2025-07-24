import { Router, type Request, type Response } from 'express';

import multer from '@shared/infrastructure/config/multer';
import { Roles, verifyAccess } from '@shared/infrastructure/middlewares/auth';
import { makeUserController } from '@users/main/factories/user-controller-factory';

export const createUserRouter = () => {
  const router = Router();
  const controller = makeUserController();

  router.post('/', (req: Request, res: Response) => controller.register(req, res));

  router.post('/change-password', verifyAccess([Roles.USER]), (req: Request, res: Response) =>
    controller.changePassword(req, res),
  );

  router.post(
    '/change-profile-picture',
    verifyAccess([Roles.USER]),
    multer.single('profilePicture'),
    (req: Request, res: Response) => controller.changeProfilePicture(req, res),
  );

  router.post(
    '/change-profile-banner',
    verifyAccess([Roles.USER]),
    multer.single('profileBanner'),
    (req: Request, res: Response) => controller.changeProfileBanner(req, res),
  );

  return router;
};
