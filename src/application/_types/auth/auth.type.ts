export type AuthToken = {
  accessToken: string;
  expiresAt: Date;
  message: string;
};

export interface IAuthService {
  authenticate(email: string, password: string): Promise<AuthToken>;
}

export interface IAuthRepository {}

export interface IHashProvider {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
