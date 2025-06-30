import 'dotenv/config';

import { DataSource } from 'typeorm';

const PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: PORT,
  logging: true,
  migrations: ['src/infrastructure/migrations/*.ts'],
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/domain/models/*.ts'],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
