import type { Request, Response } from 'express';

import { IUserService } from '@/_types/users/user.types';

class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  static createInstance(userService: IUserService) {
    return new UserController(userService);
  }

  async register(req: Request, res: Response) {
    try {
        
    } catch (error) {
        
    }
  }
}

export default UserController;
