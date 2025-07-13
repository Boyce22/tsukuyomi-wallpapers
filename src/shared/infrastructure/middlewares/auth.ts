import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '@users/infrastructure/repositories/user';

interface JWT {
  id: string;
  iat: number;
}

const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWT;

    const userRepository = new UserRepository();

    const user = await userRepository.findLastPasswordChangeById(decoded.id);

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const tokenIssuedAt = new Date(decoded.iat * 1000);

    if (user.lastPasswordChange && tokenIssuedAt < user.lastPasswordChange) {
      res.status(401).json({ message: 'Token invalid due to password change' });
      return;
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

export { validateToken };
