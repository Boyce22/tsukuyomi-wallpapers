import { User } from './user';

export class Role {
  id!: string;
  name!: string;
  isActive!: boolean;
  users!: User[];
}