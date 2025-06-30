import type { User } from '@/domain/models/user';
import { AuthToken } from '../auth/auth.type';

export type CreateUser = {
  email: string;
  name: string;
  lastName: string;
  userName: string;
  birthDate: string;
  password: string;
};

export interface IUserRepository {
  register(dto: CreateUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  changeProfilePicture(id: string, path: string): Promise<void>;
}
