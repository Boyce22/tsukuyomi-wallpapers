import bcrypt from 'bcryptjs';
import { IHashProvider } from '@/_types/auth/auth.type';

class HashProvider implements IHashProvider {
  private readonly saltRounds = 10;

  constructor() {}

  public static createInstance(): HashProvider {
    return new HashProvider();
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default HashProvider;
