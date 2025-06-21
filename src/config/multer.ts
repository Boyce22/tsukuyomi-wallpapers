import path from 'path';
import multer from 'multer';

const baseDir = process.env.COMPRESS_OUTPUT_PATH_DIR || '_temp';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, baseDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const parsed = path.parse(file.originalname);
    cb(null, `${parsed.name}-${uniqueSuffix}${parsed.ext}`);
  },
});

export default multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limite 60MB
});
