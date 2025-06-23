export interface IUserService {
    updateName(ids: string, data: Pick<User, 'name'>): Promise<UpdateNameUser>;
}