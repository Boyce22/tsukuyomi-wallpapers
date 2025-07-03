import { Router } from 'express';

import { createUserRouter } from '@users/infrastructure/routes/user';
import { createTagsRouter } from '@tags/infrastructure/routes/tags';
import { createStorageRouter } from '@wallpapers/infrastructure/routes/storage';
import { createWallpaperRouter } from '@wallpapers/infrastructure/routes/wallpaper';
import { createAuthRouter } from '../../auth/infrastructure/routes/auth';

const router = Router();

router.use('/tags', createTagsRouter());
router.use('/auth', createAuthRouter());
router.use('/wallpapers', createWallpaperRouter());
router.use('/storage', createStorageRouter());
router.use('/users', createUserRouter());

export default router;
