import bcrypt from 'bcryptjs';
import { IHashProvider } from '@auth/types/auth.type';

class HashProvider implements IHashProvider {
  private readonly saltRounds: number = 10;

  constructor() {}

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default HashProvider;
