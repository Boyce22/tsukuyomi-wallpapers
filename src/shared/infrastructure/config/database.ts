import 'dotenv/config';

import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

const PORT = parseInt(process.env.DB_PORT!);

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: PORT,
  logging: true,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [isProduction ? 'dist/**/domain/models/*.js' : 'src/**/domain/models/*.ts'],
  migrations: [
    isProduction ? 'dist/shared/infrastructure/migrations/*.js' : 'src/shared/infrastructure/migrations/*.ts',
  ],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
