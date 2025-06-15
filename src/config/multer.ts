import multer from 'multer';

export default multer({
  dest: '_temp/',
  limits: { fileSize: 10 * 1024 * 1024 }, // limite 10MB (opcional)
});
