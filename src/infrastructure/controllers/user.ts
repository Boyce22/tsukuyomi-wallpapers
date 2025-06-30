import type { Request, Response } from 'express';
import { CreateUser, IUserService } from '@/application/_types/users/user.types';
import { IRegisterUserUseCase } from '@/application/use-cases/user/register-user';
import { IChangeProfilePictureUseCase } from '@/application/use-cases/user/change-profile-picture';

class UserController {
  private readonly service: IUserService;
  private readonly registerUserUseCase: IRegisterUserUseCase;
  private readonly changeProfilePictureUseCase: IChangeProfilePictureUseCase;

  constructor(
    service: IUserService,
    registerUserUseCase: IRegisterUserUseCase,
    changeProfilePictureUseCase: IChangeProfilePictureUseCase,
  ) {
    this.service = service;
    this.registerUserUseCase = registerUserUseCase;
    this.changeProfilePictureUseCase = changeProfilePictureUseCase;
  }

  static createInstance(
    service: IUserService,
    registerUserUseCase: IRegisterUserUseCase,
    changeProfilePictureUseCase: IChangeProfilePictureUseCase,
  ): UserController {
    return new UserController(service, registerUserUseCase, changeProfilePictureUseCase);
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    const token = await this.registerUserUseCase.execute(dto);

    res.status(201).json(token);
  }

  async changeProfilePicture(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new Error('Photo is required');
    }

    const id = req.userId!;

    const response = await this.changeProfilePictureUseCase.execute(id, req.file);

    res.status(200).json(response);
  }
}

export default UserController;
