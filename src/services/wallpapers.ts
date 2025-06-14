import { UrlNotFound } from '@/exceptions/url-not-found';
import { UrlNotProvided } from '@/exceptions/url-not-provided';

import { IWallpaperService } from '@/_types/services/wallpapers';
import { RegisterWallpaper } from '@/_types/dtos/register-wallpaper';
import type { IWallpapersRepository } from '@/_types/repositories/wallpapers';

class WallpapersService implements IWallpaperService {
  private repository: IWallpapersRepository;

  /**
   * @param repository - Instância do repositório do modelo de wallpapers
   */
  constructor(repository: IWallpapersRepository) {
    this.repository = repository;
  }

  /**
   * Cria uma nova instância do serviço WallpapersService
   * @param repository - Repositório do modelo de wallpapers
   * @returns Instância do serviço
   */
  static createInstance(repository: IWallpapersRepository): WallpapersService {
    return new WallpapersService(repository);
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

  register = async (dto: RegisterWallpaper): Promise<string> => {
    throw new Error('Method not implemented.');
  };
}

export default WallpapersService;
