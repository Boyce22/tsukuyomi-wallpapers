import { Router } from 'express';

import TagService from '@/services/tags';
import UserService from '@/services/user';
import WallpaperService from '@/services/wallpaper';
import BackBlazeService from '@/services/back-blaze';
import ImageCompressService from '@/services/image-compress';

import { TagRepository } from '@/repositories/tag';
import WallpaperRepository from '@/repositories/wallpaper';

import { createUserRouter } from '@/routes/user';
import { createTagsRouter } from '@/routes/tags';
import { createStorageRouter } from '@/routes/storage';
import { createWallpaperRouter } from '@/routes/wallpaper';

import UserRepository from '@/repositories/user';

const router = Router();

const storageService = BackBlazeService.createInstance();
const imageCompressService = ImageCompressService.createInstance();
const tagService = TagService.createInstance(TagRepository.createInstance());
const userService = UserService.createInstance(UserRepository.createInstace());
const wallpaperService = WallpaperService.createInstance(WallpaperRepository.createInstance());

const params = { tagService, wallpaperService, imageCompressService, storageService };

router.use('/tags', createTagsRouter(tagService));
router.use('/wallpapers', createWallpaperRouter(params));
router.use('/storage', createStorageRouter(storageService));
router.use('/users', createUserRouter(userService));

export default router;
