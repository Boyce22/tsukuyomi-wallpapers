import UserController from '@/infrastructure/controllers/user';
import { RegisterUserUseCase } from '@/application/use-cases/user/register-user';
import { ChangeProfilePictureUseCase } from '@/application/use-cases/user/change-profile-picture';

import UserRepository from '@/infrastructure/repositories/user';
import HashProvider from '@/infrastructure/services/hash-provider';
import AuthenticateUserUseCase from '@/application/use-cases/auth/authenticate-user';
import BackBlazeService from '@/infrastructure/services/back-blaze';
import ImageCompressService from '@/infrastructure/services/image-compress';

export const makeUserController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider);
  const registerUserUseCase = new RegisterUserUseCase(userRepository, authenticateUserUseCase);
  const changeProfilePictureUseCase = new ChangeProfilePictureUseCase(userRepository);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService();

  return new UserController(registerUserUseCase, changeProfilePictureUseCase);
};
