import 'dotenv/config';

import { DataSource } from 'typeorm';
import { Tag } from '@/models/tag';
import { User } from '@/models/user';
import { Role } from '@/models/role';
import { Wallpaper } from '@/models/wallpaper';

const PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: PORT,
  logging: true,
  migrations: ['src/migrations/*.ts'],
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Wallpaper, Tag, User, Role],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
