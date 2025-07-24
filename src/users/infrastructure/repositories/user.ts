import { User } from '../../domain/models/user';
import { Repository } from 'typeorm';
import AppDataSource from '@shared/infrastructure/config/database';
import { CreateUser, IUserRepository } from '../../types/user.types';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
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
    return await this.repository.findOne({
      where: { email },
      select: ['password', 'id'],
      relations: ['roles'],
    });
  }

  async findLastPasswordChangeById(id: string): Promise<User | null> {
    return await this.repository
      .createQueryBuilder('user')
      .where({ id: id })
      .select('user.lastPasswordChange')
      .getOne();
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOneBy({ id });
  }

  async changeProfilePicture(id: string, path: string): Promise<void> {
    await this.repository.update({ id }, { profilePictureUrl: path });
  }

  async changeProfileBanner(id: string, path: string): Promise<void> {
    await this.repository.update({ id }, { bannerUrl: path });
  }

  async changePassword(id: string, password: string): Promise<void> {
    await this.repository.update({ id }, { password, lastPasswordChange: new Date() });
  }
}

export default UserRepository;
