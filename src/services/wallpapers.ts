import { Tag } from '@/models/tag';
import { UrlNotFound } from '@/exceptions/url-not-found';
import { UrlNotProvided } from '@/exceptions/url-not-provided';

import { Wallpaper } from '@/models/wallpaper';
import { CreateWallpaper, IWallpaperRepository, IWallpaperService } from '@/_types/wallpapers/wallpaper.types';

class WallpaperService implements IWallpaperService {
  private repository: IWallpaperRepository;

  /**
   * Cria uma instância do serviço WallpaperService
   * @param repository - Instância do repositório do modelo de wallpapers
   */
  constructor(repository: IWallpaperRepository) {
    this.repository = repository;
  }

  /**
   * Cria uma nova instância do serviço WallpaperService
   * @param repository - Repositório do modelo de wallpapers
   * @returns Instância do serviço WallpaperService
   */
  static createInstance(repository: IWallpaperRepository): WallpaperService {
    return new WallpaperService(repository);
  }

  /**
   * Obtém a URL da imagem em tamanho original a partir do ID do wallpaper
   * @param {string} id - ID do wallpaper
   * @returns {Promise<string>} URL da imagem em tamanho original
   * @throws {UrlNotProvided} Se o ID não for fornecido (null, undefined ou string vazia)
   * @throws {UrlNotFound} Se não for encontrada a URL original para o ID informado
   */
  async getOriginalSize(id: string): Promise<string> {
    if (!id) {
      throw new UrlNotProvided('Wallpaper ID must be provided.');
    }

    const urlOriginalSize = await this.repository.findUrlWithOriginalSizeById(id);

    if (!urlOriginalSize) {
      throw new UrlNotFound('URL with full size not found for the given ID.', id);
    }

    return urlOriginalSize;
  }

  /**
   * Registra um novo wallpaper com as tags associadas
   * @param {CreateWallpaper} dto - Dados para registro do wallpaper
   * @param {Tag[]} tags - Lista de tags para associar ao wallpaper
   * @returns {Promise<Wallpaper>} ID do wallpaper registrado
   * @throws {Erro} Erro caso ocorra falha no registro
   */
  async register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper> {
    try {
      const wallpaper = await this.repository.register(dto, tags);
      return wallpaper;
    } catch (error) {
      console.error('Error registering wallpaper:', error);
      throw error;
    }
  }
}

export default WallpaperService;
