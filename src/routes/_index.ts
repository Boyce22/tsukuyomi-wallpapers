import { Router } from 'express';

import TagService from '@/services/tags';
import WallpaperService from '@/services/wallpapers';

import { TagRepository } from '@/repositories/tags';
import WallpaperRepository from '@/repositories/wallpapers';

import { createTagsRouter } from './tags';
import { createWallpapersRouter } from '@/routes/wallpapers';
import ImageCompressService from '@/services/image-compress';
import BackBlazeService from '@/services/back-blaze';

const router = Router();

const tagService = TagService.createInstance(TagRepository.createInstance());
const wallpaperService = WallpaperService.createInstance(WallpaperRepository.createInstance());
const imageCompressService = ImageCompressService.createInstance();
const storageService = BackBlazeService.createInstance()

const params = { tagService, wallpaperService, imageCompressService, storageService };

router.use('/tags', createTagsRouter(tagService));
router.use('/wallpapers', createWallpapersRouter(params));

export default router;
