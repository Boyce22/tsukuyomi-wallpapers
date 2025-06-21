import { Tag } from '@/models/tag';
import { UrlNotFound } from '@/exceptions/url-not-found';
import { UrlNotProvided } from '@/exceptions/url-not-provided';

import { Wallpaper } from '@/models/wallpaper';
import { CreateWallpaper, IWallpaperRepository, IWallpaperService } from '@/_types/wallpapers/wallpaper.types';

/**
 * Serviço responsável pela lógica de negócio relacionada a wallpapers.
 * Implementa a interface IWallpaperService.
 */
class WallpaperService implements IWallpaperService {
  private readonly repository: IWallpaperRepository;

  /**
   * Cria uma instância do serviço de wallpapers.
   * 
   * @param {IWallpaperRepository} repository - Repositório para acesso aos dados de wallpapers.
   */
  constructor(repository: IWallpaperRepository) {
    this.repository = repository;
  }

  /**
   * Cria uma nova instância do serviço a partir do repositório fornecido.
   * 
   * @param {IWallpaperRepository} repository - Repositório para persistência e consulta.
   * @returns {WallpaperService} Nova instância do serviço.
   */
  static createInstance(repository: IWallpaperRepository): WallpaperService {
    return new WallpaperService(repository);
  }

  /**
   * Obtém a URL da imagem original do wallpaper pelo seu ID.
   * 
   * @param {string} id - ID do wallpaper.
   * @returns {Promise<string>} Promise que resolve para a URL da imagem original.
   * @throws {UrlNotProvided} Caso o ID seja nulo, vazio ou inválido.
   * @throws {UrlNotFound} Caso a URL original para o ID informado não seja encontrada.
   */
  async getOriginalSize(id: string): Promise<string> {
    if (!id || !id.trim()) {
      throw new UrlNotProvided('Wallpaper ID must be provided.');
    }

    const url = await this.repository.findUrlWithOriginalSizeById(id);

    if (!url) {
      throw new UrlNotFound('Original image URL not found for the provided ID.', id);
    }

    return url;
  }

  /**
   * Registra um novo wallpaper e associa as tags informadas.
   * 
   * @param {CreateWallpaper} dto - Dados para criação do wallpaper.
   * @param {Tag[]} tags - Lista de tags associadas ao wallpaper.
   * @returns {Promise<Wallpaper>} Promise que resolve para o wallpaper recém-registrado.
   * @throws {Error} Caso ocorra falha durante o registro do wallpaper.
   */
  async register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper> {
    try {
      return await this.repository.register(dto, tags);
    } catch (error) {
      console.error('Error registering wallpaper:', error);
      throw new Error('Failed to register wallpaper.');
    }
  }
}

export default WallpaperService;
