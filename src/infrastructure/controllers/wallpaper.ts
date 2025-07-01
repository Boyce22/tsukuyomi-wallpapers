import type { Request, Response } from 'express';
import { CreateWallpaper } from '@/application/_types/wallpapers/wallpaper.types';
import { IRegisterWallpaperUseCase } from '@/application/use-cases/wallpaper/register-wallpaper';
import { IGetOriginalSizeUseCase } from '@/application/use-cases/wallpaper/get-original-size';
import { FileRequiredError } from '@/domain/exceptions/common/file-required-error';

export interface CreateWallpaperRequest extends Request {
  file?: Express.Multer.File;
  body: CreateWallpaper;
}

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
      file: {
        buffer: file.buffer,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
      },
      userId,
      dto,
    });

    res.status(201).json({ message });
  }
}

export default WallpaperController;
