import { User } from '@/domain/models/user';
import { Repository } from 'typeorm';
import AppDataSource from '@/infrastructure/config/database';
import { CreateUser, IUserRepository } from '@/application/_types/users/user.types';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  static createInstace(): UserRepository {
    return new UserRepository();
  }

  async register(dto: CreateUser): Promise<User> {
    const user = this.repository.create({
      email: dto.email,
      name: dto.name,
      lastName: dto.lastName,
      birthDate: dto.birthDate,
      password: dto.password,
      userName: dto.userName,
      profilePictureUrl: 'string', // FIXME: substituir pelo valor correto no futuro
    });

    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

  async changeProfilePicture(id: string, path: string): Promise<void> {
    await this.repository.update({ id }, { profilePictureUrl: path });
  }
}

export default UserRepository;
