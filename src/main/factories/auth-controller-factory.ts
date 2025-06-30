import AuthControler from '@/infrastructure/controllers/auth';
import AuthenticateUserUseCase from '@/application/use-cases/auth/authenticate-user';

import UserRepository from '@/infrastructure/repositories/user';
import HashProvider from '@/infrastructure/services/hash-provider';

export const makeAuthController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider);

  return new AuthControler(authenticateUserUseCase);
};
