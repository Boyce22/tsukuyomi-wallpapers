import type { Request, Response } from 'express';
import { IAuthenticateUserUseCase } from '@/application/use-cases/auth/authenticate-user';

class AuthControler {
  private readonly authenticateUserUseCase: IAuthenticateUserUseCase;

  constructor(authenticateUserUseCase: IAuthenticateUserUseCase) {
    this.authenticateUserUseCase = authenticateUserUseCase;
  }

  static createInstance(authenticateUserUseCase: IAuthenticateUserUseCase): AuthControler {
    return new AuthControler(authenticateUserUseCase);
  }

  async authenticate(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const token = await this.authenticateUserUseCase.execute(email, password);

    res.json(token);
  }
}

export default AuthControler;
