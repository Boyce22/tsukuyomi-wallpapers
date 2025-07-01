import jwt, { SignOptions } from 'jsonwebtoken';
import { ITokenService } from '@/application/_types/auth/auth.type';

export class JwtTokenService implements ITokenService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  generateToken(payload: object): string {
    const options: SignOptions = { expiresIn: '1h' };
    return jwt.sign(payload, this.secret, options);
  }
}
