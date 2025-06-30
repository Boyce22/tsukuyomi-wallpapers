import { Router } from 'express';

import { createUserRouter } from '@/infrastructure/routes/user';
import { createTagsRouter } from '@/infrastructure/routes/tags';
import { createStorageRouter } from '@/infrastructure/routes/storage';
import { createWallpaperRouter } from '@/infrastructure/routes/wallpaper';
import { createAuthRouter } from './auth';

const router = Router();

router.use('/tags', createTagsRouter());
router.use('/auth', createAuthRouter());
router.use('/wallpapers', createWallpaperRouter());
router.use('/storage', createStorageRouter());
router.use('/users', createUserRouter());

export default router;
