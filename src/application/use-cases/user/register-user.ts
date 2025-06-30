import { CreateUser, IUserRepository } from '@/application/_types/users/user.types';
import { IAuthenticateUserUseCase } from '@/application/use-cases/auth/authenticate-user';
import { AuthToken } from '@/application/_types/auth/auth.type';

export interface IRegisterUserUseCase {
  execute(dto: CreateUser): Promise<AuthToken>;
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly authService: IAuthenticateUserUseCase;

  constructor(userRepository: IUserRepository, authService: IAuthenticateUserUseCase) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(dto: CreateUser): Promise<AuthToken> {
    const user = await this.userRepository.register(dto);
    const token = await this.authService.authenticate(user.email, dto.password);
    return token;
  }
}
