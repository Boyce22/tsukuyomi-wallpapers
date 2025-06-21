import { Router } from 'express';

import TagService from '@/services/tags';
import AuthService from '@/services/auth';
import UserService from '@/services/user';
import WallpaperService from '@/services/wallpaper';
import HashProvider from '@/services/hash-provider';
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

const hashProvider = HashProvider.createInstance();
const storageService = BackBlazeService.createInstance();
const imageCompressService = ImageCompressService.createInstance();

const tagService = TagService.createInstance(TagRepository.createInstance());
const userService = UserService.createInstance(UserRepository.createInstace());
const authService = AuthService.createInstance(UserRepository.createInstace(), hashProvider);
const wallpaperService = WallpaperService.createInstance(WallpaperRepository.createInstance());

const params = { tagService, wallpaperService, imageCompressService, storageService };

router.use('/tags', createTagsRouter(tagService));
router.use('/wallpapers', createWallpaperRouter(params));
router.use('/storage', createStorageRouter(storageService));
router.use('/users', createUserRouter(userService, hashProvider, authService));

export default router;
