import type { Request, Response } from 'express';
import { IAuthenticateUserUseCase } from '../../application/use-cases/authenticate-user';
import { MissingFieldsError } from '@shared/domain/exceptions/missing-fields-error';

class AuthControler {
  private readonly authenticateUserUseCase: IAuthenticateUserUseCase;

  constructor(authenticateUserUseCase: IAuthenticateUserUseCase) {
    this.authenticateUserUseCase = authenticateUserUseCase;
  }

  async authenticate(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new MissingFieldsError('Email and password are required');
    }

    const token = await this.authenticateUserUseCase.authenticate(email, password);

    res.json(token);
  }
}

export default AuthControler;
