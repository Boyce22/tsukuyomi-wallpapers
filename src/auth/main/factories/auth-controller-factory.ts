import AuthControler from '@auth/infrastructure/controllers/auth';
import AuthenticateUserUseCase from '@auth/application/use-cases/authenticate-user';

import UserRepository from '../../../users/infrastructure/repositories/user';
import HashProvider from '../../../shared/infrastructure/services/hash-provider';

export const makeAuthController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider);

  return new AuthControler(authenticateUserUseCase);
};
