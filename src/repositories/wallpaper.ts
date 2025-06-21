import { Tag } from '@/models/tag';
import { Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { Wallpaper } from '@/models/wallpaper';
import { CreateWallpaper, IWallpaperRepository } from '@/_types/wallpapers/wallpaper.types';

/**
 * Repositório responsável pelas operações de acesso e persistência da entidade {@link Wallpaper}.
 * Implementa a interface {@link IWallpaperRepository}.
 */
class WallpaperRepository implements IWallpaperRepository {
  private repository: Repository<Wallpaper>;

  /**
   * Cria uma nova instância do {@link WallpaperRepository} e inicializa o repositório TypeORM.
   */
  constructor() {
    this.repository = AppDataSource.getRepository(Wallpaper);
  }

  /**
   * Cria uma nova instância do repositório de wallpapers.
   *
   * @returns {WallpaperRepository} Nova instância de {@link WallpaperRepository}.
   */
  static createInstance(): WallpaperRepository {
    return new WallpaperRepository();
  }

  /**
   * Busca a URL da imagem original do wallpaper com base no ID informado.
   *
   * @param {string} id - Identificador único do wallpaper.
   * @returns {Promise<string | null>} Promise resolvida com a URL da imagem original,
   * ou `null` caso o wallpaper não seja encontrado.
   * @throws {Error} Caso ocorra falha na consulta ao banco de dados.
   */
  async findUrlWithOriginalSizeById(id: string): Promise<string | null> {
    const wallpaper = await this.repository.findOneBy({ id });
    return wallpaper?.originalUrl ?? null;
  }

  /**
   * Registra um novo wallpaper no banco de dados com as tags associadas.
   *
   * @param {CreateWallpaper} dto - Objeto contendo os dados para criação do wallpaper.
   * @param {Tag[]} tags - Lista de entidades {@link Tag} a serem associadas ao wallpaper.
   * @returns {Promise<Wallpaper>} Promise resolvida com a entidade {@link Wallpaper} criada.
   * @throws {Error} Caso ocorra falha ao salvar o wallpaper no banco de dados.
   */
  async register(dto: CreateWallpaper, tags: Tag[]): Promise<Wallpaper> {
    const wallpaper = this.repository.create({
      name: dto.name,
      description: dto.description,
      isMature: dto.isMature,
      tags,
    });

    return await this.repository.save(wallpaper);
  }
}

export default WallpaperRepository;
