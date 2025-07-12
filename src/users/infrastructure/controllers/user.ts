import type { Request, Response } from 'express';
import { CreateUser } from '../../types/user.types';
import { IRegisterUserUseCase } from '@users/application/use-cases/register-user';
import { IChangeProfilePictureUseCase } from '../../application/use-cases/change-profile-picture';
import { FileRequiredError } from '@shared/domain/exceptions/file-required-error';
import AuthenticateUserUseCase from '@auth/application/use-cases/authenticate-user';

class UserController {
  private readonly registerUserUseCase: IRegisterUserUseCase;
  private readonly authenticateUserUseCase: AuthenticateUserUseCase;
  private readonly changeProfilePictureUseCase: IChangeProfilePictureUseCase;

  constructor(
    registerUserUseCase: IRegisterUserUseCase,
    authenticateUserUseCase: AuthenticateUserUseCase,
    changeProfilePictureUseCase: IChangeProfilePictureUseCase,
  ) {
    this.registerUserUseCase = registerUserUseCase;
    this.authenticateUserUseCase = authenticateUserUseCase;
    this.changeProfilePictureUseCase = changeProfilePictureUseCase;
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    const user = await this.registerUserUseCase.execute(dto);

    const token = await this.authenticateUserUseCase.execute(user.email, dto.password);

    res.status(201).json(token);
  }

  async changeProfilePicture(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Photo is required');
    }

    const id = req.userId!;

    const response = await this.changeProfilePictureUseCase.execute(id, {
      buffer: req.file.buffer,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname,
    });

    res.status(200).json(response);
  }
}

export default UserController;
