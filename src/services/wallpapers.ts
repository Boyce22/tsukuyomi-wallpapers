import { Tag } from '@/models/tag';
import { UrlNotFound } from '@/exceptions/url-not-found';
import { UrlNotProvided } from '@/exceptions/url-not-provided';

import type { IWallpaperService } from '@/_types/services/wallpapers';
import type { RegisterWallpaper } from '@/_types/dtos/wallpapers/register-wallpaper';
import type { IWallpaperRepository } from '@/_types/repositories/wallpapers';

class WallpaperService implements IWallpaperService {
  private repository: IWallpaperRepository;

  /**
   * @param repository - Instância do repositório do modelo de wallpapers
   */
  constructor(repository: IWallpaperRepository) {
    this.repository = repository;
  }

  /**
   * Cria uma nova instância do serviço WallpaperService
   * @param repository - Repositório do modelo de wallpapers
   * @returns Instância do serviço
   */
  static createInstance(repository: IWallpaperRepository): WallpaperService {
    return new WallpaperService(repository);
  }

  /**
   * Converte uma URL de imagem sample para a versão em tamanho original
   * @param url - URL da imagem sample
   * @returns URL da imagem original
   * @throws UrlNotProvided Se a URL não for fornecida (null, undefined ou string vazia)
   * @throws UrlNotFound Se não for encontrada a URL original no repositório
   */
  getOriginalSize = async (id: string): Promise<string> => {
    if (!id) {
      throw new UrlNotProvided('Wallpaper ID must be provided.');
    }

    const urlOriginalSize = await this.repository.findUrlWithOriginalSizeById(id);

    if (!urlOriginalSize) {
      throw new UrlNotFound('Url with full size not found with the id', id);
    }

    return urlOriginalSize;
  };

  register = async (dto: RegisterWallpaper, tags: Tag[]): Promise<string> => {
    try {
      const wallpaper = await this.repository.register(dto, tags);
      return wallpaper.id;
    } catch (error) {
      console.error('Error registering wallpaper:', error);
      throw error;
    }
  };
}

export default WallpaperService;
