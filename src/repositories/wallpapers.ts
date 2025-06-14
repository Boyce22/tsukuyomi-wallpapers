import { Tag } from '@/models/tag';
import { Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { Wallpaper } from '@/models/wallpaper';
import type { IWallpaperRepository } from '@/_types/repositories/wallpapers';
import type { RegisterWallpaper } from '@/_types/dtos/wallpapers/register-wallpaper';

/**
 * Repositório responsável por realizar operações no banco de dados relacionadas à entidade Wallpaper.
 */
class WallpaperRepository implements IWallpaperRepository {
  private repository: Repository<Wallpaper>;

  constructor() {
    this.repository = AppDataSource.getRepository(Wallpaper);
  }

  /**
   * Cria uma nova instância do repositório de wallpapers.
   * @returns {WallpaperRepository} Nova instância de WallpaperRepository.
   */
  static createInstance(): WallpaperRepository {
    return new WallpaperRepository();
  }

  /**
   * Busca a URL da imagem em tamanho original a partir do ID do wallpaper.
   * @param {string} id - ID do wallpaper a ser buscado.
   * @returns {Promise<string | null>} URL da imagem original, ou null se não encontrado.
   */
  findUrlWithOriginalSizeById = async (id: string): Promise<string | null> => {
    const wallpaper = await this.repository.findOneBy({ id });

    if (!wallpaper) return null;

    return wallpaper.originalUrl;
  };

  /**
   * Registra um novo wallpaper no banco de dados.
   * @param {RegisterWallpaper} dto - Dados do wallpaper a ser registrado.
   * @param {Tag[]} tags - Lista de tags associadas ao wallpaper.
   * @returns {Promise<Wallpaper>} O wallpaper criado.
   */
  register = async (dto: RegisterWallpaper, tags: Tag[]): Promise<Wallpaper> => {
    const wallpaper = await this.repository.save({
      name: dto.name,
      description: dto?.description,
      isMature: dto?.isMature,
      tags: tags,
    });

    return wallpaper;
  };
}

export default WallpaperRepository;
