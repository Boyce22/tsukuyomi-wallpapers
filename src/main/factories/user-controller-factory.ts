import UserController from '@/infrastructure/controllers/user';
import { RegisterUserUseCase } from '@/application/use-cases/user/register-user';
import { ChangeProfilePictureUseCase } from '@/application/use-cases/user/change-profile-picture';

import UserRepository from '@/infrastructure/repositories/user';
import HashProvider from '@/application/services/hash-provider';
import UserService from '@/application/services/user';
import AuthService from '@/application/services/auth';
import BackBlazeService from '@/application/services/back-blaze';
import ImageCompressService from '@/application/services/image-compress';

export const makeUserController = () => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  const userService = new UserService(userRepository, hashProvider);
  const authService = new AuthService(userRepository, hashProvider);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService();

  const registerUserUseCase = new RegisterUserUseCase(userService, authService);
  const changeProfilePictureUseCase = new ChangeProfilePictureUseCase(
    userService,
    imageCompressService,
    storageService,
  );

  return new UserController(registerUserUseCase, changeProfilePictureUseCase);
};
