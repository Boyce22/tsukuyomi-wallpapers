import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JWT {
  id: string;
}

const authenticate = (jwtSecret: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwtSecret) as JWT;

      req.userId = decoded.id;

      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }
  };
};

export { authenticate };
