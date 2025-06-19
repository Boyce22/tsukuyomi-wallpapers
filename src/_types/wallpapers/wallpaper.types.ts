import { Request } from 'express';
import { Tag } from '@/models/tag';
import { Wallpaper } from '@/models/wallpaper';

export interface CreateWallpaper {
  name: string;
  description?: string;
  isMature?: boolean;
  tagsIDs: string[];
}

export interface CreateWallpaperRequest extends Request {
  file?: Express.Multer.File;
  body: CreateWallpaper;
}

export interface IWallpaperService {
  /**
   * Obtém a URL da imagem em tamanho original a partir do ID do wallpaper
   * @param {string} id - ID do wallpaper
   * @returns {Promise<string>} URL da imagem em tamanho original
   * @throws {UrlNotProvided} Se o ID não for fornecido (null, undefined ou string vazia)
   * @throws {UrlNotFound} Se não for encontrada a URL original para o ID informado
   */

  getOriginalSize(id: string): Promise<string>;

  /**
   * Registra um novo wallpaper com as tags associadas
   * @param {CreateWallpaper} dto - Dados para registro do wallpaper
   * @param {Tag[]} tags - Lista de tags para associar ao wallpaper
   * @returns {Promise<Wallpaper>} ID do wallpaper registrado
   * @throws {Erro} Erro caso ocorra falha no registro
   */
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}

export interface IWallpaperRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}
