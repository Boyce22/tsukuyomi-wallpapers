import path from 'path';
import multer from 'multer';

const baseDir = process.env.COMPRESS_OUTPUT_PATH_DIR || '_temp';

const storage = multer.memoryStorage();

export default multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limite 60MB
});
