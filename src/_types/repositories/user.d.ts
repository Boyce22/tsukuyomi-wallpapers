import { User } from '@/models/user';

export interface IUserRepository {
    updateName(ids: string, data: Pick<User, 'name'>): Promise<UpdateNameUser>;
}