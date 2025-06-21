import { Request } from 'express';
import { Tag } from '@/models/tag';
import { Wallpaper } from '@/models/wallpaper';

/**
 * DTO para criação de um novo wallpaper.
 * Representa os dados necessários para registrar um wallpaper no sistema.
 */
export interface CreateWallpaper {
  /**
   * Nome do wallpaper.
   */
  name: string;

  /**
   * Descrição opcional do wallpaper.
   */
  description?: string;

  /**
   * Indica se o wallpaper possui conteúdo adulto.
   */
  isMature?: boolean;

  /**
   * IDs das tags associadas ao wallpaper.
   */
  tagsIDs: string[];
}

/**
 * Extensão da interface Request do Express, com body tipado e arquivo via Multer.
 */
export interface CreateWallpaperRequest extends Request {
  /**
   * Arquivo de imagem enviado na requisição.
   */
  file?: Express.Multer.File;

  /**
   * Corpo da requisição contendo os dados do wallpaper.
   */
  body: CreateWallpaper;
}

/**
 * Interface da camada de serviço responsável pelas operações de negócio relacionadas a wallpapers.
 */
export interface IWallpaperService {
  /**
   * Obtém a URL da imagem em tamanho original a partir do ID do wallpaper.
   *
   * @param {string} id - ID do wallpaper.
   * @returns {Promise<string>} Promessa que resolve para a URL da imagem original.
   * @throws {UrlNotProvided} Se o ID não for fornecido (null, undefined ou string vazia).
   * @throws {UrlNotFound} Se a URL original não for localizada para o ID informado.
   */
  getOriginalSize(id: string): Promise<string>;

  /**
   * Registra um novo wallpaper com as tags associadas.
   *
   * @param {CreateWallpaper} dto - Dados para criação do wallpaper.
   * @param {Tag[]} tags - Lista de tags a serem associadas.
   * @returns {Promise<Wallpaper>} Promessa que resolve para o wallpaper registrado.
   * @throws {Error} Caso ocorra falha no registro.
   */
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}

/**
 * Interface da camada de repositório responsável pela persistência de dados dos wallpapers.
 */
export interface IWallpaperRepository {
  /**
   * Busca a URL da imagem original pelo ID do wallpaper.
   *
   * @param {string} id - ID do wallpaper.
   * @returns {Promise<string | null>} Promessa que resolve para a URL da imagem original,
   * ou null caso não seja encontrada.
   */
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;

  /**
   * Registra um novo wallpaper e associa as tags.
   *
   * @param {CreateWallpaper} dto - Dados para criação do wallpaper.
   * @param {Tag[]} tags - Tags associadas ao wallpaper.
   * @returns {Promise<Wallpaper>} Promessa que resolve para o wallpaper criado.
   */
  register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper>;
}
