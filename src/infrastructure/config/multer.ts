import path from 'path';
import multer from 'multer';
import { env } from './env';

const baseDir = env.COMPRESS_OUTPUT_PATH_DIR;

const storage = multer.memoryStorage();

export default multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limite 60MB
});
