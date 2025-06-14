import 'reflect-metadata';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';

import routes from './routes/_index';
import AppDataSource from './config/database';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/tsukuyomi/v1', routes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão realizada com o banco de dados');
    app.listen(PORT, () => {
      console.log(`Servidor aberto na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
