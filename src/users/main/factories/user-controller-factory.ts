import UserController from '@users/infrastructure/controllers/user';
import UserRepository from '@users/infrastructure/repositories/user';
import UserRoleRepository from '@users/infrastructure/repositories/user-role';
import { RegisterUserUseCase } from '@users/application/use-cases/register-user';
import { AssociateRoleUseCase } from '@users/application/use-cases/associate-role';
import { ChangePasswordUseCase } from '@users/application/use-cases/change-password';
import { ChangeProfileBannerUseCase } from '@users/application/use-cases/change-profile-banner';
import { ChangeProfilePictureUseCase } from '@users/application/use-cases/change-profile-picture';

import HashProvider from '@shared/infrastructure/services/hash-provider';
import BackBlazeService from '@shared/infrastructure/services/back-blaze';
import ImageCompressService from '@shared/infrastructure/services/image-compress';
import AuthenticateUserUseCase from '@auth/application/use-cases/authenticate-user';

export const makeUserController = () => {
  const userRepository = new UserRepository();
  const userRoleRepository = new UserRoleRepository();
  const hashProvider = new HashProvider();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider);
  const registerUserUseCase = new RegisterUserUseCase(userRepository, hashProvider);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService();

  const associateRoleUseCase = new AssociateRoleUseCase(userRoleRepository);

  const changeProfileBannerUseCase = new ChangeProfileBannerUseCase(
    userRepository,
    storageService,
    imageCompressService,
  );

  const changeProfilePictureUseCase = new ChangeProfilePictureUseCase(
    userRepository,
    storageService,
    imageCompressService,
  );

  const changePasswordUseCase = new ChangePasswordUseCase(userRepository, hashProvider);

  return new UserController(
    registerUserUseCase,
    authenticateUserUseCase,
    changeProfilePictureUseCase,
    changePasswordUseCase,
    changeProfileBannerUseCase,
    associateRoleUseCase,
  );
};
