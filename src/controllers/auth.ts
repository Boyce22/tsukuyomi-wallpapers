import { IAuthService } from '@/_types/auth/auth.type';
import type { Request, Response } from 'express';

class AuthControler {
  private readonly authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { accessToken, expiresAt } = await this.authService.authenticate(email, password);

    return {
      accessToken,
      expiresAt,
      message: 'Successfully authenticated',
    };
  }
}

export default AuthControler;
