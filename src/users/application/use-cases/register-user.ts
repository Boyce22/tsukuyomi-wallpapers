import { IHashProvider } from '@auth/types/auth.type';

import type { User } from '@users/domain/models/user';
import { CreateUser, IUserRepository } from '@users/types/user.types';

export interface IRegisterUserUseCase {
  execute(dto: CreateUser): Promise<User>;
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
  private readonly hashProvider: IHashProvider;
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.hashProvider = hashProvider;
    this.userRepository = userRepository;
  }

  async execute(dto: CreateUser): Promise<User> {
    const hashedPassword = await this.hashProvider.hash(dto.password);

    const user = await this.userRepository.register({
      ...dto,
      password: hashedPassword,
    });

    return user;
  }
}
