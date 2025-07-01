import AuthControler from '@/infrastructure/controllers/auth';
import AuthenticateUserUseCase from '@/application/use-cases/auth/authenticate-user';

import UserRepository from '@/infrastructure/repositories/user';
import HashProvider from '@/infrastructure/services/hash-provider';
import { JwtTokenService } from '@/infrastructure/services/jwt-token';
import { env } from '@/infrastructure/config/env';

export const makeAuthController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const tokenService = new JwtTokenService(env.JWT_SECRET);
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider, tokenService);

  return new AuthControler(authenticateUserUseCase);
};
