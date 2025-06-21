import jwt from 'jsonwebtoken';

import { IUserRepository } from '@/_types/users/user.types';
import { AuthToken, IAuthService, IHashProvider } from '@/_types/auth/auth.type';

class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;

  private readonly hashProvider: IHashProvider;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  static createInstance(userRepository: IUserRepository, hashProvider: IHashProvider): IAuthService {
    return new AuthService(userRepository, hashProvider);
  }

  async authenticate(email: string, password: string): Promise<AuthToken> {
    const user = await this.userRepository.findByEmail(email);

    const isValid = user && (await this.hashProvider.compare(password, user.password));

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return {
      accessToken: token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    };
  }
}

export default AuthService;
