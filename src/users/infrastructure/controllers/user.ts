import type { Request, Response } from 'express';
import { CreateUser } from '../../types/user.types';
import { IRegisterUserUseCase } from '../../application/use-cases/register-user';
import { IChangeProfilePictureUseCase } from '../../application/use-cases/change-profile-picture';
import { FileRequiredError } from '../../../shared/domain/exceptions/file-required-error';

class UserController {
  private readonly registerUserUseCase: IRegisterUserUseCase;
  private readonly changeProfilePictureUseCase: IChangeProfilePictureUseCase;

  constructor(registerUserUseCase: IRegisterUserUseCase, changeProfilePictureUseCase: IChangeProfilePictureUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.changeProfilePictureUseCase = changeProfilePictureUseCase;
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    const token = await this.registerUserUseCase.execute(dto);

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
