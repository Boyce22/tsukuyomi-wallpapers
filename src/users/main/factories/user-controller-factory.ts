import UserController from '@users/infrastructure/controllers/user';
import { RegisterUserUseCase } from '@users/application/use-cases/register-user';
import { ChangeProfilePictureUseCase } from '@users/application/use-cases/change-profile-picture';

import UserRepository from '@users/infrastructure/repositories/user';
import HashProvider from '@shared/infrastructure/services/hash-provider';
import AuthenticateUserUseCase from '@auth/application/use-cases/authenticate-user';
import BackBlazeService from '@shared/infrastructure/services/back-blaze';
import ImageCompressService from '@shared/infrastructure/services/image-compress';

export const makeUserController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider);
  const registerUserUseCase = new RegisterUserUseCase(userRepository, authenticateUserUseCase);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService();
  const changeProfilePictureUseCase = new ChangeProfilePictureUseCase(
    userRepository,
    storageService,
    imageCompressService,
  );

  return new UserController(registerUserUseCase, changeProfilePictureUseCase);
};
