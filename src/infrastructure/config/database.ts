import { DataSource } from 'typeorm';
import { env } from './env';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  logging: true,
  migrations: ['src/infrastructure/migrations/*.ts'],
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: ['src/infrastructure/entities/*.ts'],
  migrationsTableName: 'migrations',
});

export default AppDataSource;