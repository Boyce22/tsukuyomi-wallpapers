import type { User } from '@/models/user';

export interface IUserService {
  register(dto: CreateUser): Promise<string>;
}

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
}
