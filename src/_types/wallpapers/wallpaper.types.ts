import { Request } from 'express';
import { Tag } from '@/models/tag';
import { Wallpaper } from '@/models/wallpaper';

/**
 * DTO para criação de um novo wallpaper.
 *
 * @typedef {Object} CreateWallpaper
 * @property {string} name - Nome do wallpaper.
 * @property {string} [description] - Descrição opcional do wallpaper.
 * @property {boolean} [isMature] - Indica se o wallpaper possui conteúdo adulto.
 * @property {string[]} tagsIDs - IDs das tags associadas ao wallpaper.
 */
export interface CreateWallpaper {
  name: string;
  description?: string;
  isMature?: boolean;
  tagsIDs: string[];
}

/**
 * Extensão da interface Request do Express para criação de wallpaper,
 * incluindo tipagem para o corpo e arquivo recebido via Multer.
 *
 * @interface CreateWallpaperRequest
 * @extends {Request}
 */
export interface CreateWallpaperRequest extends Request {
  /**
   * Arquivo de imagem enviado na requisição.
   */
  file?: Express.Multer.File;

  /**
   * Corpo da requisição com dados do wallpaper.
   */
  body: CreateWallpaper;
}

/**
 * Interface da camada de serviço para operações de negócio relacionadas a wallpapers.
 *
 * @interface IWallpaperService
 */
export interface IWallpaperService {
  /**
   * Obtém a URL da imagem original do wallpaper pelo seu ID.
   *
   * @param {string} id - ID do wallpaper.
   * @returns {Promise<string>} URL da imagem original.
   * @throws {UrlNotProvided} Caso o ID seja inválido, nulo ou vazio.
   * @throws {UrlNotFound} Caso não seja encontrada URL original para o ID.
   */
  getOriginalSize(id: string): Promise<string>;

  /**
   * Registra um novo wallpaper no sistema com as tags associadas.
   *
   * @param {CreateWallpaper} dto - Dados para criação do wallpaper.
   * @param {Tag[]} tags - Lista de tags associadas ao wallpaper.
   * @returns {Promise<Wallpaper>} Wallpaper recém-registrado.
   * @throws {Error} Caso ocorra falha no registro.
   */
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}

/**
 * Interface da camada de repositório responsável pela persistência dos wallpapers.
 *
 * @interface IWallpaperRepository
 */
export interface IWallpaperRepository {
  /**
   * Busca a URL da imagem original pelo ID do wallpaper.
   *
   * @param {string} id - ID do wallpaper.
   * @returns {Promise<string | null>} URL da imagem original ou null se não encontrada.
   */
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;

  /**
   * Registra um novo wallpaper e associa as tags relacionadas.
   *
   * @param {CreateWallpaper} dto - Dados para criação do wallpaper.
   * @param {Tag[]} tags - Lista de tags associadas.
   * @returns {Promise<Wallpaper>} Wallpaper criado.
   * @throws {Error} Caso ocorra falha ao salvar o wallpaper.
   */
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}
