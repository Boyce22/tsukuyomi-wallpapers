import { Router } from 'express';

import TagService from '@/services/tags';
import WallpaperService from '@/services/wallpapers';

import { TagRepository } from '@/repositories/tags';
import WallpaperRepository from '@/repositories/wallpapers';

import { createTagsRouter } from './tags';
import { createWallpapersRouter } from '@/routes/wallpapers';

const router = Router();

const tagService = TagService.createInstance(TagRepository.createInstance());
const wallpaperService = WallpaperService.createInstance(WallpaperRepository.createInstance());

router.use('/tags', createTagsRouter(tagService));
router.use('/wallpapers', createWallpapersRouter(wallpaperService, tagService));

export default router;
