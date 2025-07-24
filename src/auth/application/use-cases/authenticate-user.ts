import jwt from 'jsonwebtoken';

import { IUserRepository } from '@users/types/user.types';
import { AuthToken, IHashProvider } from '../../types/auth.type';
import { InvalidCredential } from '@auth/domain/exceptions/invalid-credential';

export interface IAuthenticateUserUseCase {
  execute(email: string, password: string): Promise<AuthToken>;
}

class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly hashProvider: IHashProvider;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  async execute(email: string, password: string): Promise<AuthToken> {
    return await this.authenticate(email, password);
  }

  async authenticate(email: string, password: string): Promise<AuthToken> {
    const user = await this.userRepository.findByEmail(email);

    const isValid = user && (await this.hashProvider.compare(password, user.password));

    if (!isValid) {
      throw new InvalidCredential();
    }

    const roles = user.roles.map((role) => role.name);

    const token = jwt.sign({ id: user.id, email: user.email, roles }, process.env.JWT_SECRET!, {
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
