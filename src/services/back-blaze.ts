import path from 'path';
import type { Request, Response } from 'express';
import { TagNotFound } from '@/exceptions/tag-not-found';
import { QualityCompress } from '@/_types/common/quality.enum';
import { ITagService } from '@/_types/tags/tags.type';
import { CreateWallpaperRequest, IWallpaperService } from '@/_types/wallpapers/wallpaper.types';
import { IImageCompressService } from '@/_types/compress/compress.type';

type ConstructorParams = {
  wallpaperService: IWallpaperService;
  tagService: ITagService;
  imageCompressService: IImageCompressService;
};

class WallpaperController {
  private wallpaperService: IWallpaperService;
  private tagService: ITagService;
  private imageCompressService: IImageCompressService;

  constructor({ wallpaperService, tagService, imageCompressService }: ConstructorParams) {
    this.wallpaperService = wallpaperService;
    this.tagService = tagService;
    this.imageCompressService = imageCompressService;
  }

  static createInstance(params: ConstructorParams): WallpaperController {
    return new WallpaperController(params);
  }

  /**
   * Gera dinamicamente o caminho para salvar a imagem comprimida,
   * baseado no diretório definido por variável de ambiente.
   */
  private _generateOutputPath(): string {
    const baseDir = process.env.COMPRESS_OUTPUT_PATH_DIR;

    if (!baseDir) {
      throw new Error('COMPRESS_OUTPUT_PATH_DIR is not defined in environment variables.');
    }

    const timestamp = Date.now();
    const filename = `_COMPRESSED_${timestamp}.jpg`;

    return path.join(baseDir, filename);
  }

  async getOriginalSize(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const originalUrl = await this.wallpaperService.getOriginalSize(id);

      if (!originalUrl) {
        res.status(404).json({ error: 'Wallpaper not found' });
        return;
      }

      res.status(200).json({ url: originalUrl });
    } catch (err) {
      console.error('Error retrieving original wallpaper size:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: 'File is required' });
        return;
      }

      const dto: CreateWallpaperRequest['body'] =
        typeof req.body.body === 'string' ? JSON.parse(req.body.body) : req.body;

      if (!Array.isArray(dto.tagsIDs) || !dto.tagsIDs.length) {
        res.status(400).json({ error: 'tagsIDs must be a non-empty array' });
        return;
      }

      const tags = await this.tagService.findAllByIds(dto.tagsIDs);

      const outputPath = this._generateOutputPath();

      await this.imageCompressService.compress({
        path: file.path,
        outputPath,
        quality: QualityCompress.MEDIUM,
      });

      const created = await this.wallpaperService.register(dto, tags);
      res.status(201).json({ id: created.id });
    } catch (error) {
      if (error instanceof TagNotFound) {
        res.status(404).json({ error: error.message });
        return;
      }

      console.error('Error in wallpaper registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default WallpaperController;
