import multer from 'multer';

const storage = multer.memoryStorage();

export default multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limite 60MB
});
