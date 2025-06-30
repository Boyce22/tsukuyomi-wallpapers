import type { Request, Response } from 'express';
import { CreateWallpaperRequest } from '@/application/_types/wallpapers/wallpaper.types';
import { IRegisterWallpaperUseCase } from '@/application/use-cases/wallpaper/register-wallpaper';
import { IGetOriginalSizeUseCase } from '@/application/use-cases/wallpaper/get-original-size';

class WallpaperController {
  private readonly registerWallpaperUseCase: IRegisterWallpaperUseCase;
  private readonly getOriginalSizeUseCase: IGetOriginalSizeUseCase;

  constructor(
    registerWallpaperUseCase: IRegisterWallpaperUseCase,
    getOriginalSizeUseCase: IGetOriginalSizeUseCase,
  ) {
    this.registerWallpaperUseCase = registerWallpaperUseCase;
    this.getOriginalSizeUseCase = getOriginalSizeUseCase;
  }

  static createInstance(
    registerWallpaperUseCase: IRegisterWallpaperUseCase,
    getOriginalSizeUseCase: IGetOriginalSizeUseCase,
  ): WallpaperController {
    return new WallpaperController(registerWallpaperUseCase, getOriginalSizeUseCase);
  }

  async getOriginalSize(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const originalUrl = await this.getOriginalSizeUseCase.execute(id);

    res.status(200).json({ url: originalUrl });
  }

  async register(req: CreateWallpaperRequest, res: Response): Promise<void> {
    const file = req.file;
    const userId = req.userId!;
    const dto = req.body;

    if (!file) {
      res.status(400).json({ error: 'File is required' });
      return;
    }

    const wallpaperId = await this.registerWallpaperUseCase.execute({
      file,
      userId,
      dto,
    });

    res.status(201).json({ id: wallpaperId });
  }
}

export default WallpaperController;
