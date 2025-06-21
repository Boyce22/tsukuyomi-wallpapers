import path from 'path';
import fs from 'fs/promises';
import type { Request, Response } from 'express';
import { TagNotFound } from '@/exceptions/tag-not-found';
import { QualityCompress } from '@/_types/common/quality.enum';
import { ITagService } from '@/_types/tags/tag.type';
import { CreateWallpaper, CreateWallpaperRequest, IWallpaperService } from '@/_types/wallpapers/wallpaper.types';
import { IImageCompressService } from '@/_types/compress/compress.type';
import { IStorageService } from '@/_types/storage/storage.type';

type ConstructorParams = {
  wallpaperService: IWallpaperService;
  tagService: ITagService;
  imageCompressService: IImageCompressService;
  storageService: IStorageService;
};

/**
 * Controller responsável por lidar com requisições relacionadas a wallpapers.
 */
class WallpaperController {
  private readonly wallpaperService: IWallpaperService;
  private readonly tagService: ITagService;
  private readonly imageCompressService: IImageCompressService;
  private readonly storageService: IStorageService;
  private readonly bucket: string;

  /**
   * Cria uma instância de WallpaperController.
   * @param params - Serviços injetados no controller.
   */
  constructor({ wallpaperService, tagService, imageCompressService, storageService }: ConstructorParams) {
    this.wallpaperService = wallpaperService;
    this.tagService = tagService;
    this.imageCompressService = imageCompressService;
    this.storageService = storageService;
    this.bucket = this._resolveBucket();
  }

  private _resolveBucket(): string {
    const bucket = process.env.STORAGE_WALLPAPER_BUCKET;
    if (!bucket) {
      throw new Error('Missing environment variable: STORAGE_WALLPAPER_BUCKET');
    }
    return bucket;
  }

  /**
   * Cria uma nova instância do WallpaperController.
   */
  static createInstance(params: ConstructorParams): WallpaperController {
    return new WallpaperController(params);
  }

  /**
   * Retorna a URL da imagem original com base no ID do wallpaper.
   */
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
      console.error('Error retrieving original wallpaper URL:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Registra um novo wallpaper com as tags associadas, realiza compressão e armazena os arquivos.
   */
  async register(req: CreateWallpaperRequest, res: Response): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'File is required' });
        return;
      }

      const dto: CreateWallpaper = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      if (!Array.isArray(dto.tagsIDs) || dto.tagsIDs.length === 0) {
        res.status(400).json({ error: '`tagsIDs` must be a non-empty array' });
        return;
      }

      const tags = await this.tagService.findAllByIds(dto.tagsIDs);

      const { original, compressed } = await this.imageCompressService.compress({
        path: file.path,
        quality: QualityCompress.MEDIUM,
      });

      // Salva as imagens original e comprimida no bucket
      await Promise.all([
        this.storageService.upload(this.bucket, `/original/${file.filename}`, original.buffer),
        this.storageService.upload(this.bucket, `/compressed/${file.filename}`, compressed.buffer),
      ]);

      const created = await this.wallpaperService.register(dto, tags);

      res.status(201).json({ id: created.id });
    } catch (error) {
      if (error instanceof TagNotFound) {
        res.status(404).json({ error: error.message });
        return;
      }

      console.error('Error registering wallpaper:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default WallpaperController;
