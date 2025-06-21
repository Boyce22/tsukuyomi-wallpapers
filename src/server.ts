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

// Middleware para rotas não encontradas (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware global de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error Handler', err);
  res.status(500).json({ error: 'Internal Server Error' });
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
