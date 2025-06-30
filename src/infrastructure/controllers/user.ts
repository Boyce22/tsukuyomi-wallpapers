import type { Request, Response } from 'express';
import { CreateUser } from '@/application/_types/users/user.types';
import { IRegisterUserUseCase } from '@/application/use-cases/user/register-user';
import { IChangeProfilePictureUseCase } from '@/application/use-cases/user/change-profile-picture';
import { FileRequiredError } from '@/domain/exceptions/common/file-required-error';

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

    const response = await this.changeProfilePictureUseCase.execute(id, req.file.path);

    res.status(200).json(response);
  }
}

export default UserController;
