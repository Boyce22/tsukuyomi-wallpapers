import UserController from '@/controllers/users';
import { IUserService } from '@/_types/users/user.types';
import { Router, type Request, type Response } from 'express';

export const createUserRouter = (service: IUserService) => {
  const router = Router();
  const controller = UserController.createInstance(service);

  router.post('/', (req: Request, res: Response) => controller.register(req, res));

  return router;
};
