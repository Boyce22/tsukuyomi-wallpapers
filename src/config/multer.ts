import path from 'path';

import multer from 'multer';

const baseDir = process.env.COMPRESS_OUTPUT_PATH_DIR || '_temp';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, baseDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const parse = path.parse(file.originalname);
    cb(null, parse.name + '-' + uniqueSuffix + parse.ext); // Include the extension
  },
});

export default multer({
  dest: baseDir,
  storage: storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // limite 60MB
});
