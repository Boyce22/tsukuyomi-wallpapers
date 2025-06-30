import AuthControler from '@/infrastructure/controllers/auth';
import { AuthenticateUserUseCase } from '@/application/use-cases/auth/authenticate-user';

import UserRepository from '@/infrastructure/repositories/user';
import HashProvider from '@/application/services/hash-provider';
import AuthService from '@/application/services/auth';

export const makeAuthController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const authService = new AuthService(userRepository, hashProvider);
  const authenticateUserUseCase = new AuthenticateUserUseCase(authService);

  return new AuthControler(authenticateUserUseCase);
};
