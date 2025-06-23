import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JWT {
  id: string;
}

/**
 * Middleware de autenticação JWT para rotas protegidas.
 *
 * Verifica se o token JWT está presente no cabeçalho Authorization e se é válido.
 * Caso positivo, adiciona o `userId` decodificado à requisição (`req.userId`) e chama o próximo middleware.
 * Caso contrário, retorna erro 401 (não autorizado) ou 403 (token inválido ou expirado).
 *
 * @param {Request} req - Objeto da requisição HTTP.
 * @param {Response} res - Objeto da resposta HTTP.
 * @param {NextFunction} next - Função que passa o controle para o próximo middleware.
 *
 * @returns {void} Retorna `void` para compatibilidade com middleware Express.
 */
const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWT;

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

export { authenticate };
