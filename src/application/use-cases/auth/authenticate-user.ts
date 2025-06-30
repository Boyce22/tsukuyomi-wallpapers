import jwt from 'jsonwebtoken';

import { IUserRepository } from '@/application/_types/users/user.types';
import { AuthToken, IHashProvider } from '@/application/_types/auth/auth.type';
import { InvalidCredential } from '@/domain/exceptions/auth/invalid-credential';

export interface IAuthenticateUserUseCase {
  authenticate(email: string, password: string): Promise<AuthToken>;
}

class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly hashProvider: IHashProvider;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  async authenticate(email: string, password: string): Promise<AuthToken> {
    const user = await this.userRepository.findByEmail(email);

    const isValid = user && (await this.hashProvider.compare(password, user.password));

    if (!isValid) {
      throw new InvalidCredential();
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return {
      accessToken: token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      message: 'Successfully authenticated',
    };
  }
}

export default AuthenticateUserUseCase;
