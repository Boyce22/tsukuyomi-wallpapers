import type { Request, Response } from 'express';
import { CreateUser } from '../../types/user.types';
import { IRegisterUserUseCase } from '@users/application/use-cases/register-user';
import { IChangeProfilePictureUseCase } from '../../application/use-cases/change-profile-picture';
import { FileRequiredError } from '@shared/domain/exceptions/file-required-error';
import AuthenticateUserUseCase from '@auth/application/use-cases/authenticate-user';
import { IChangePasswordUseCase } from '@users/application/use-cases/change-password';

class UserController {
  private readonly registerUserUseCase: IRegisterUserUseCase;
  private readonly authenticateUserUseCase: AuthenticateUserUseCase;
  private readonly changeProfilePictureUseCase: IChangeProfilePictureUseCase;
  private readonly changePasswordUseCase: IChangePasswordUseCase;

  constructor(
    registerUserUseCase: IRegisterUserUseCase,
    authenticateUserUseCase: AuthenticateUserUseCase,
    changeProfilePictureUseCase: IChangeProfilePictureUseCase,
    changePasswordUseCase: IChangePasswordUseCase,
  ) {
    this.registerUserUseCase = registerUserUseCase;
    this.authenticateUserUseCase = authenticateUserUseCase;
    this.changeProfilePictureUseCase = changeProfilePictureUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    const user = await this.registerUserUseCase.execute(dto);

    const token = await this.authenticateUserUseCase.execute(user.email, dto.password);

    res.status(201).json(token);
  }

  async changeProfilePicture(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Please provide a photo');
    }

    const id = req.userId!;

    const response = await this.changeProfilePictureUseCase.execute(id, req.file);

    res.status(200).json(response);
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const { password, newPassword } = req.body;

    const id = req.userId!;

    const response = await this.changePasswordUseCase.execute(id, password, newPassword);

    res.status(204).json(response);
  }
}

export default UserController;
