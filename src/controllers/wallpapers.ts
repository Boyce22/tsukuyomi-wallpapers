import path from 'path';
import fs from 'fs/promises';
import type { Request, Response } from 'express';
import { TagNotFound } from '@/exceptions/tag-not-found';
import { QualityCompress } from '@/_types/common/quality.enum';
import { ITagService } from '@/_types/tags/tags.type';
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
 * Controller responsável por lidar com requisições relacionadas a wallpapers
 */
class WallpaperController {
  private wallpaperService: IWallpaperService;
  private tagService: ITagService;
  private imageCompressService: IImageCompressService;
  private storageService: IStorageService;
  private bucket: string;

  /**
   * Cria uma instância de WallpaperController
   * @param {ConstructorParams} params - Serviços necessários para o controller
   */
  constructor({ wallpaperService, tagService, imageCompressService, storageService }: ConstructorParams) {
    this.wallpaperService = wallpaperService;
    this.tagService = tagService;
    this.imageCompressService = imageCompressService;
    this.storageService = storageService;
    this.bucket = this._build();
  }

  private _build(): string {
    const bucket = process.env.STORAGE_WALLPAPER_BUCKET;

    if (!bucket) {
      throw new Error('Missing Wallpaper S3 configuration environment variables');
    }

    return bucket;
  }

  /**
   * Cria uma nova instância de WallpaperController
   * @param {ConstructorParams} params - Serviços necessários para o controller
   * @returns {WallpaperController} Instância do controller
   */
  static createInstance(params: ConstructorParams): WallpaperController {
    return new WallpaperController(params);
  }

  /**
   * Retorna a URL da imagem em seu tamanho original a partir do ID do wallpaper
   * @param {Request} req - Requisição Express contendo o ID do wallpaper nos parâmetros
   * @param {Response} res - Resposta Express com a URL da imagem ou erro
   * @returns {Promise<void>}
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
      console.error('Error retrieving original wallpaper size:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Registra um novo wallpaper, realiza compressão da imagem e associa tags
   * @param {CreateWallpaperRequest} req - Requisição contendo arquivo e corpo com os dados do wallpaper
   * @param {Response} res - Resposta com o ID do wallpaper criado ou erro
   * @returns {Promise<void>}
   */
  async register(req: CreateWallpaperRequest, res: Response): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'File is required' });
        return;
      }

      const dto: CreateWallpaper = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      if (!Array.isArray(dto.tagsIDs) || !dto.tagsIDs.length) {
        res.status(400).json({ error: 'tagsIDs must be a non-empty array' });
        return;
      }

      const tags = await this.tagService.findAllByIds(dto.tagsIDs);

      const { compressed, original } = await this.imageCompressService.compress({
        path: file.path,
        quality: QualityCompress.MEDIUM,
      });

      await Promise.all([
        this.storageService.upload(this.bucket, `/original/${file.filename}`, compressed.buffer),
        this.storageService.upload(this.bucket, `/compressed/${file.filename}`, original.buffer),
      ]);

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
