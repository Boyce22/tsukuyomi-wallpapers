import { Tag } from '@/models/tag';
import { Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { Wallpaper } from '@/models/wallpaper';
import { CreateWallpaper, IWallpaperRepository } from '@/_types/wallpapers/wallpaper.types';

/**
 * Repositório responsável pelas operações de acesso e persistência da entidade Wallpaper.
 * Implementa a interface IWallpaperRepository.
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
   *
   * @returns {WallpaperRepository} Nova instância do repositório.
   */
  static createInstance(): WallpaperRepository {
    return new WallpaperRepository();
  }

  /**
   * Busca a URL da imagem original do wallpaper pelo seu ID.
   *
   * @param {string} id - ID do wallpaper.
   * @returns {Promise<string | null>} Promise que resolve para a URL da imagem original,
   * ou `null` caso o wallpaper não seja encontrado.
   */
  async findUrlWithOriginalSizeById(id: string): Promise<string | null> {
    const wallpaper = await this.repository.findOneBy({ id });
    return wallpaper?.originalUrl ?? null;
  }

  /**
   * Registra um novo wallpaper com as tags associadas.
   *
   * @param {CreateWallpaper} dto - Dados necessários para criar o wallpaper.
   * @param {Tag[]} tags - Lista de tags a serem associadas ao wallpaper.
   * @returns {Promise<Wallpaper>} Promise que resolve para o wallpaper criado.
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
