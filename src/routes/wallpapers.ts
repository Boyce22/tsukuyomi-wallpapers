import express from 'express'
const router = express.Router()

import WallpapersController from '@/controllers/wallpapers'
import WallpapersService from '@/services/wallpapers'
import WallpapersRepository from '@/repositories/wallpapers'

const respository = WallpapersRepository.createInstance()
const service = WallpapersService.createInstance(respository)
const controller = WallpapersController.createInstance(service)

router.get('/original-size/:id', controller.getOriginalSize)

export default router