import { Router } from 'express';

import TagService from '@/services/tags';
import WallpaperService from '@/services/wallpaper';

import { TagRepository } from '@/repositories/tag';
import WallpaperRepository from '@/repositories/wallpaper';

import { createTagsRouter } from './tags';
import { createWallpaperRouter } from '@/routes/wallpaper';
import ImageCompressService from '@/services/image-compress';
import BackBlazeService from '@/services/back-blaze';
import { createStorageRouter } from './storage';

const router = Router();

const tagService = TagService.createInstance(TagRepository.createInstance());
const wallpaperService = WallpaperService.createInstance(WallpaperRepository.createInstance());
const imageCompressService = ImageCompressService.createInstance();
const storageService = BackBlazeService.createInstance();

const params = { tagService, wallpaperService, imageCompressService, storageService };

router.use('/tags', createTagsRouter(tagService));
router.use('/wallpapers', createWallpaperRouter(params));
router.use('/storage', createStorageRouter(storageService));

export default router;
