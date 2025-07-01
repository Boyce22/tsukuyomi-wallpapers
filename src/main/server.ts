import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import routes from '@/infrastructure/routes/_index';
import AppDataSource from '@/infrastructure/config/database';
import { env } from '@/infrastructure/config/env';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API versionadas
app.use('/tsukuyomi/v1', routes);

// Middleware global de tratamento de erros
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const isProd = env.NODE_ENV === 'production';
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: isProd ? 'Internal Server Error' : message,
    ...(isProd ? {} : { stack: err.stack }),
  });
});

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  } catch (error) {
    console.error('Falha ao inicializar a conexão com o banco:', error);
    process.exit(1); // Encerra o processo em caso de erro crítico
  }
};

initializeDatabase().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Servidor rodando na porta ${env.PORT}`);
  });
});