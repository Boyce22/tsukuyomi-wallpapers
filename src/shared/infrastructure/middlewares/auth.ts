import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '@users/infrastructure/repositories/user';

interface JWT {
  id: string;
  iat: number;
  roles: string[];
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  MODERATOR = 'MODERATOR',
}

export const verifyAccess = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWT;

      const userRepository = new UserRepository();
      const user = await userRepository.findLastPasswordChangeById(decoded.id);

      if (!user || (user.lastPasswordChange && new Date(decoded.iat * 1000) < user.lastPasswordChange)) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (roles.length > 0 && !decoded.roles.some((role) => roles.includes(role))) {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        return;
      }

      req.userId = decoded.id;
      req.roles = decoded.roles;

      next();
    } catch {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
};
