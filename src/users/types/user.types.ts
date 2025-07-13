import type { User } from '../domain/models/user';

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
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  changeProfilePicture(id: string, path: string): Promise<void>;
  changeProfileBanner(id: string, path: string): Promise<void>;
  changePassword(id: string, password: string): Promise<void>;
  findLastPasswordChangeById(id: string): Promise<User | null>;
}
