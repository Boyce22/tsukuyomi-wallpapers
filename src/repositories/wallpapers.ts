import { Tag } from '@/models/tag';
import { Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { Wallpaper } from '@/models/wallpaper';
import { CreateWallpaper, IWallpaperRepository } from '@/_types/wallpapers/wallpaper.types';

/**
 * Repositório responsável por operações no banco de dados relacionadas à entidade Wallpaper.
 */
class WallpaperRepository implements IWallpaperRepository {
  private repository: Repository<Wallpaper>;

  /**
   * Inicializa o repositório TypeORM para a entidade Wallpaper.
   */
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
   * @returns {Promise<string | null>} Promise que resolve para a URL da imagem original ou null se não encontrado.
   */
  findUrlWithOriginalSizeById = async (id: string): Promise<string | null> => {
    const wallpaper = await this.repository.findOneBy({ id });
    return wallpaper?.originalUrl ?? null;
  };

  /**
   * Registra um novo wallpaper no banco de dados.
   * @param {CreateWallpaper} dto - Dados do wallpaper a ser registrado.
   * @param {Tag[]} tags - Lista de tags associadas ao wallpaper.
   * @returns {Promise<Wallpaper>} Promise que resolve para o wallpaper criado.
   */
  register = async (dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper> => {
    const wallpaper = this.repository.create({
      name: dto.name,
      description: dto?.description,
      isMature: dto?.isMature,
      tags,
    });

    return this.repository.save(wallpaper);
  };
}

export default WallpaperRepository;
