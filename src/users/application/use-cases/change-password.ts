import { IHashProvider } from '@auth/types/auth.type';
import { IUserRepository } from '@users/types/user.types';
import { PasswordNotMatchError } from '@users/domain/exceptions/password-not-match-error';
import { UserNotFoundError } from '@users/domain/exceptions/user-not-found-error';

export interface IChangePasswordUseCase {
  execute(id: string, password: string, newPassword: string): Promise<void>;
}

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  private readonly repository: IUserRepository;
  private readonly hashProvider: IHashProvider;

  constructor(repository: IUserRepository, hashProvider: IHashProvider) {
    this.repository = repository;
    this.hashProvider = hashProvider;
  }

  async execute(id: string, password: string, newPassword: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    const isValid = user && (await this.hashProvider.compare(password, user.password));

    if (!isValid) {
      throw new PasswordNotMatchError('The new password does not match the current password');
    }

    const hashedPassword = await this.hashProvider.hash(newPassword);

    return await this.repository.changePassword(id, hashedPassword);
  }
}
