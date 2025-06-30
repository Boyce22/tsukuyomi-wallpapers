import { AuthToken, IAuthService } from '@/application/_types/auth/auth.type';
import { IUserRepository } from '@/application/_types/users/user.types';
import { IHashProvider } from '@/application/_types/auth/auth.type';

export interface IAuthenticateUserUseCase {
  execute(email: string, password: string): Promise<AuthToken>;
}

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly hashProvider: IHashProvider;
  private readonly authService: IAuthService;

  constructor(
    userRepository: IUserRepository,
    hashProvider: IHashProvider,
    authService: IAuthService,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.authService = authService;
  }

  async execute(email: string, password: string): Promise<AuthToken> {
    const user = await this.userRepository.findByEmail(email);

    const isValid = user && (await this.hashProvider.compare(password, user.password));

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token: AuthToken = await this.authService.authenticate(user.email, password);

    return token;
  }
}
