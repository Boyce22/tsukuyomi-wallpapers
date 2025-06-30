import { IUserRepository } from '@/application/_types/users/user.types';
import { ProfilePictureChangeError } from '@/domain/exceptions/user/profile-picture-change-error';

export interface IChangeProfilePictureUseCase {
  execute(id: string, path: string): Promise<string>;
}

export class ChangeProfilePictureUseCase implements IChangeProfilePictureUseCase {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(id: string, path: string): Promise<string> {
    try {
      await this.repository.changeProfilePicture(id, path);
      return 'Profile picture changed successfully';
    } catch (error) {
      console.error('Error changing profile picture:', error);
      throw new ProfilePictureChangeError('Failed to change profile picture.');
    }
  }
}

export default ChangeProfilePictureUseCase;
