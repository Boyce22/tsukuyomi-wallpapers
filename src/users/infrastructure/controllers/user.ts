import type { Request, Response } from 'express';
import { CreateUser } from '../../types/user.types';
import { IRegisterUserUseCase } from '@users/application/use-cases/register-user';
import { IChangeProfilePictureUseCase } from '../../application/use-cases/change-profile-picture';
import { FileRequiredError } from '@shared/domain/exceptions/file-required-error';
import AuthenticateUserUseCase from '@auth/application/use-cases/authenticate-user';
import { IChangePasswordUseCase } from '@users/application/use-cases/change-password';
import { IChangeProfileBannerUseCase } from '@users/application/use-cases/change-profile-banner';
import { AssociateRoleUseCase } from '@users/application/use-cases/associate-role';
import { Roles } from '@shared/infrastructure/middlewares/auth';

class UserController {
  private readonly registerUserUseCase: IRegisterUserUseCase;
  private readonly authenticateUserUseCase: AuthenticateUserUseCase;
  private readonly changeProfilePictureUseCase: IChangeProfilePictureUseCase;
  private readonly changePasswordUseCase: IChangePasswordUseCase;
  private readonly changeProfileBannerUseCase: IChangeProfileBannerUseCase;
  private readonly associateRoleUseCase: AssociateRoleUseCase;

  constructor(
    registerUserUseCase: IRegisterUserUseCase,
    authenticateUserUseCase: AuthenticateUserUseCase,
    changeProfilePictureUseCase: IChangeProfilePictureUseCase,
    changePasswordUseCase: IChangePasswordUseCase,
    changeProfileBannerUseCase: IChangeProfileBannerUseCase,
    associateRoleUseCase: AssociateRoleUseCase,
  ) {
    this.registerUserUseCase = registerUserUseCase;
    this.authenticateUserUseCase = authenticateUserUseCase;
    this.changeProfilePictureUseCase = changeProfilePictureUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
    this.changeProfileBannerUseCase = changeProfileBannerUseCase;
    this.associateRoleUseCase = associateRoleUseCase;
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    const user = await this.registerUserUseCase.execute(dto);

    await this.associateRoleUseCase.execute(user.id, Roles.USER);

    const token = await this.authenticateUserUseCase.execute(user.email, dto.password);

    res.status(201).json(token);
  }

  async changeProfilePicture(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Please provide a photo');
    }

    const id = req.userId!;

    const response = await this.changeProfilePictureUseCase.execute(id, req.file);

    res.status(204).json(response);
  }

  async changeProfileBanner(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Please provide a photo');
    }

    const id = req.userId!;

    const response = await this.changeProfileBannerUseCase.execute(id, req.file);

    res.status(204).json(response);
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const { password, newPassword } = req.body;

    const id = req.userId!;

    const response = await this.changePasswordUseCase.execute(id, password, newPassword);

    res.status(204).json(response);
  }
}

export default UserController;
