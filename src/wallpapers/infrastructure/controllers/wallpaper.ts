import type { Request, Response } from 'express';
import { CreateWallpaperRequest } from '../../types/wallpaper.types';
import { IRegisterWallpaperUseCase } from '../../application/use-cases/register-wallpaper';
import { IGetOriginalSizeUseCase } from '../../application/use-cases/get-original-size';
import { FileRequiredError } from '../../../shared/domain/exceptions/file-required-error';

class WallpaperController {
  private readonly registerWallpaperUseCase: IRegisterWallpaperUseCase;
  private readonly getOriginalSizeUseCase: IGetOriginalSizeUseCase;

  constructor(registerWallpaperUseCase: IRegisterWallpaperUseCase, getOriginalSizeUseCase: IGetOriginalSizeUseCase) {
    this.registerWallpaperUseCase = registerWallpaperUseCase;
    this.getOriginalSizeUseCase = getOriginalSizeUseCase;
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
