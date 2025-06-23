import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import routes from './routes/_index';
import AppDataSource from './config/database';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API versionadas
app.use('/tsukuyomi/v1', routes);

// Middleware global de tratamento de erros
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const isProd = process.env.NODE_ENV === 'production';
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: isProd ? 'Internal Server Error' : message,
    ...(isProd ? {} : { stack: err.stack }),
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Falha ao inicializar a conexão com o banco:', error);
    process.exit(1); // Encerra o processo em caso de erro crítico
  });
