import UserController from '@/infrastructure/controllers/user';
import { RegisterUserUseCase } from '@/application/use-cases/user/register-user';
import { ChangeProfilePictureUseCase } from '@/application/use-cases/user/change-profile-picture';

import UserRepository from '@/infrastructure/repositories/user';
import HashProvider from '@/infrastructure/services/hash-provider';
import AuthenticateUserUseCase from '@/application/use-cases/auth/authenticate-user';
import BackBlazeService from '@/infrastructure/services/back-blaze';
import ImageCompressService from '@/infrastructure/services/image-compress';
import { JwtTokenService } from '@/infrastructure/services/jwt-token';
import { env } from '@/infrastructure/config/env';

export const makeUserController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const tokenService = new JwtTokenService(env.JWT_SECRET);
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider, tokenService);
  const registerUserUseCase = new RegisterUserUseCase(userRepository, authenticateUserUseCase);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService(env.B2_URL, env.B2_REGION, env.B2_KEY_ID, env.B2_SECRET_KEY);
  const changeProfilePictureUseCase = new ChangeProfilePictureUseCase(
    userRepository,
    storageService,
    imageCompressService,
    env.STORAGE_PROFILE_PICTURE_BUCKET,
  );

  return new UserController(registerUserUseCase, changeProfilePictureUseCase);
};
