import { AuthToken, IAuthService } from '@/application/_types/auth/auth.type';

export interface IAuthenticateUserUseCase {
  execute(email: string, password: string): Promise<AuthToken>;
}

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  private readonly authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async execute(email: string, password: string): Promise<AuthToken> {
    const token: AuthToken = await this.authService.authenticate(email, password);

    return token;
  }
}
