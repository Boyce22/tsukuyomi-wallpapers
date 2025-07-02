import { Router, type Request, type Response } from 'express';
import { makeAuthController } from '@auth/main/factories/auth-controller-factory';

export const createAuthRouter = () => {
  const router = Router();
  const controller = makeAuthController();

  router.post('/', (req: Request, res: Response) => controller.authenticate(req, res));

  return router;
};
