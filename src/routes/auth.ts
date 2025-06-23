import { IAuthService } from '@/_types/auth/auth.type';
import AuthControler from '@/controllers/auth';
import { Router, type Request, type Response } from 'express';

export const createAuthRouter = (service: IAuthService) => {
  const router = Router();
  const controller = AuthControler.createInstance(service);

  router.post('/', (req: Request, res: Response) => controller.authenticate(req, res));

  return router;
};
