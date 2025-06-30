import { Router } from 'express';

import TagService from '@/application/services/tags';
import AuthService from '@/application/services/auth';
import UserService from '@/application/services/user';
import WallpaperService from '@/application/services/wallpaper';
import HashProvider from '@/application/services/hash-provider';
import BackBlazeService from '@/application/services/back-blaze';
import ImageCompressService from '@/application/services/image-compress';

import { TagRepository } from '@/infrastructure/repositories/tag';
import WallpaperRepository from '@/infrastructure/repositories/wallpaper';

import { createUserRouter } from '@/infrastructure/routes/user';
import { createTagsRouter } from '@/infrastructure/routes/tags';
import { createStorageRouter } from '@/infrastructure/routes/storage';
import { createWallpaperRouter } from '@/infrastructure/routes/wallpaper';

import UserRepository from '@/infrastructure/repositories/user';
import { createAuthRouter } from './auth';

const router = Router();

const hashProvider = HashProvider.createInstance();
const storageService = BackBlazeService.createInstance();
const imageCompressService = ImageCompressService.createInstance();

const tagService = TagService.createInstance(TagRepository.createInstance());
const userService = UserService.createInstance(UserRepository.createInstace(), hashProvider);
const userRepository = UserRepository.createInstace();
const authService = AuthService.createInstance(userRepository, hashProvider);
const wallpaperService = WallpaperService.createInstance(WallpaperRepository.createInstance());

router.use('/tags', createTagsRouter(tagService));
router.use('/auth', createAuthRouter(authService, userRepository, hashProvider));
router.use('/wallpapers', createWallpaperRouter(wallpaperService, tagService, imageCompressService, storageService));
router.use('/storage', createStorageRouter(storageService));
router.use('/users', createUserRouter(userService, authService, imageCompressService, storageService));

export default router;
