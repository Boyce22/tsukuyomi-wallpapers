import { CreateUser, IUserService } from '@/application/_types/users/user.types';
import { IAuthService } from '@/application/_types/auth/auth.type';
import { AuthToken } from '@/application/_types/auth/auth.type';

export interface IRegisterUserUseCase {
  execute(dto: CreateUser): Promise<AuthToken>;
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
  private readonly userService: IUserService;
  private readonly authService: IAuthService;

  constructor(userService: IUserService, authService: IAuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  async execute(dto: CreateUser): Promise<AuthToken> {
    const user = await this.userService.register(dto);
    const token = await this.authService.authenticate(user.email, dto.password);
    return token;
  }
}
