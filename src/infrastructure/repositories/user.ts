import { UserEntity } from '@/infrastructure/entities/user.entity';
import { User } from '@/domain/models/user';
import { Repository } from 'typeorm';
import AppDataSource from '@/infrastructure/config/database';
import { CreateUser, IUserRepository } from '@/application/_types/users/user.types';

class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async register(dto: CreateUser): Promise<User> {
    const userEntity = this.repository.create({
      email: dto.email,
      name: dto.name,
      lastName: dto.lastName,
      birthDate: dto.birthDate,
      password: dto.password,
      userName: dto.userName,
      profilePictureUrl: 'string', // FIXME: substituir pelo valor correto no futuro
    });

    const savedEntity = await this.repository.save(userEntity);

    const user = new User();
    user.id = savedEntity.id;
    user.email = savedEntity.email;
    user.name = savedEntity.name;
    user.lastName = savedEntity.lastName;
    user.birthDate = savedEntity.birthDate;
    user.password = savedEntity.password;
    user.userName = savedEntity.userName;
    user.isVerified = savedEntity.isVerified;
    user.profilePictureUrl = savedEntity.profilePictureUrl;
    user.bannerUrl = savedEntity.bannerUrl;

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOneBy({ email });

    if (!userEntity) {
      return null;
    }

    const user = new User();
    user.id = userEntity.id;
    user.email = userEntity.email;
    user.name = userEntity.name;
    user.lastName = userEntity.lastName;
    user.birthDate = userEntity.birthDate;
    user.password = userEntity.password;
    user.userName = userEntity.userName;
    user.isVerified = userEntity.isVerified;
    user.profilePictureUrl = userEntity.profilePictureUrl;
    user.bannerUrl = userEntity.bannerUrl;

    return user;
  }

  async changeProfilePicture(id: string, path: string): Promise<void> {
    await this.repository.update({ id }, { profilePictureUrl: path });
  }
}

export default UserRepository;
