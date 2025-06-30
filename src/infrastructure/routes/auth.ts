import AuthControler from '@/infrastructure/controllers/auth';
import { Router, type Request, type Response } from 'express';
import { AuthenticateUserUseCase } from '@/application/use-cases/auth/authenticate-user';
import { IAuthService } from '@/application/_types/auth/auth.type';
import { IUserRepository } from '@/application/_types/users/user.types';
import { IHashProvider } from '@/application/_types/auth/auth.type';

export const createAuthRouter = (
  authService: IAuthService,
  userRepository: IUserRepository,
  hashProvider: IHashProvider,
) => {
  const router = Router();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider, authService);
  const controller = AuthControler.createInstance(authenticateUserUseCase);

  router.post('/', (req: Request, res: Response) => controller.authenticate(req, res));

  return router;
};
