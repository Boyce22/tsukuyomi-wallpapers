import 'dotenv/config';

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  JWT_SECRET: string;
  B2_URL: string;
  B2_REGION: string;
  B2_KEY_ID: string;
  B2_SECRET_KEY: string;
  STORAGE_PROFILE_PICTURE_BUCKET: string;
  STORAGE_WALLPAPER_BUCKET: string;
  DISCORD_TOKEN: string;
  DISCORD_REVIEWER_ROLE_ID: string;
  DISCORD_CHANNEL: string;
  COMPRESS_OUTPUT_PATH_DIR: string;
}

const getEnv = (): EnvConfig => {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
  const COMPRESS_OUTPUT_PATH_DIR = process.env.COMPRESS_OUTPUT_PATH_DIR || '_temp';

  const requiredEnvVars = [
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DATABASE',
    'JWT_SECRET',
    'B2_URL',
    'B2_REGION',
    'B2_KEY_ID',
    'B2_SECRET_KEY',
    'STORAGE_PROFILE_PICTURE_BUCKET',
    'STORAGE_WALLPAPER_BUCKET',
    'DISCORD_TOKEN',
    'DISCORD_REVIEWER_ROLE_ID',
    'DISCORD_CHANNEL',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  }

  return {
    PORT,
    NODE_ENV,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT,
    DB_USER: process.env.DB_USER!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_DATABASE: process.env.DB_DATABASE!,
    JWT_SECRET: process.env.JWT_SECRET!,
    B2_URL: process.env.B2_URL!,
    B2_REGION: process.env.B2_REGION!,
    B2_KEY_ID: process.env.B2_KEY_ID!,
    B2_SECRET_KEY: process.env.B2_SECRET_KEY!,
    STORAGE_PROFILE_PICTURE_BUCKET: process.env.STORAGE_PROFILE_PICTURE_BUCKET!,
    STORAGE_WALLPAPER_BUCKET: process.env.STORAGE_WALLPAPER_BUCKET!,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN!,
    DISCORD_REVIEWER_ROLE_ID: process.env.DISCORD_REVIEWER_ROLE_ID!,
    DISCORD_CHANNEL: process.env.DISCORD_CHANNEL!,
    COMPRESS_OUTPUT_PATH_DIR,
  };
};

export const env = getEnv();
