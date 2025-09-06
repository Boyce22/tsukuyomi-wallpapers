import type { Request, Response } from 'express';
import { CreateWallpaperRequest } from '../../types/wallpaper.types';
import { IRegisterWallpaperUseCase } from '../../application/use-cases/register-wallpaper';
import { IGetOriginalSizeUseCase } from '../../application/use-cases/get-original-size';
import { FileRequiredError } from '@shared/domain/exceptions/file-required-error';
import { IGetWallpapersUseCase } from '@wallpapers/application/use-cases/get-wallpapers';

class WallpaperController {
  private readonly getWallpapersUseCase: IGetWallpapersUseCase;
  private readonly getOriginalSizeUseCase: IGetOriginalSizeUseCase;
  private readonly registerWallpaperUseCase: IRegisterWallpaperUseCase;

  constructor(
    registerWallpaperUseCase: IRegisterWallpaperUseCase,
    getOriginalSizeUseCase: IGetOriginalSizeUseCase,
    getWallpapersUseCase: IGetWallpapersUseCase,
  ) {
    this.registerWallpaperUseCase = registerWallpaperUseCase;
    this.getOriginalSizeUseCase = getOriginalSizeUseCase;
    this.getWallpapersUseCase = getWallpapersUseCase;
  }

  async getOriginalSize(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const originalUrl = await this.getOriginalSizeUseCase.execute(id);

    res.status(200).json({ url: originalUrl });
  }

  async getFeatured(req: Request, res: Response): Promise<void> {
    const { lastId } = req.query;
  }

  async getWallpapers(req: Request, res: Response): Promise<void> {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    if (!cursor || typeof cursor !== 'string' || !cursor.trim()) {
      res.status(400).json({ error: 'Cursor is required' });
      return;
    }

    if (limit > 100) {
      res.status(400).json({ error: 'Limit cannot be greater than 100' });
      return;
    }

    const wallpapers = await this.getWallpapersUseCase.execute(limit, cursor);

    res.json(wallpapers);
  }

  async register(req: CreateWallpaperRequest, res: Response): Promise<void> {
    const file = req.file;
    const userId = req.userId!;
    const dto = req.body;

    if (!file) {
      throw new FileRequiredError('File is required');
    }

    const message = await this.registerWallpaperUseCase.execute({
      file,
      userId,
      dto,
    });

    res.status(201).json({ message });
  }
}

export default WallpaperController;
