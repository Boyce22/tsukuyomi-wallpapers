import type { Request, Response } from 'express';
import type { IWallpaperService } from '@/_types/services/wallpapers';
import type { ITagService } from '@/_types/services/tags';
import type { RegisterWallpaper } from '@/_types/dtos/wallpapers/register-wallpaper';
import { TagNotFound } from '@/exceptions/tag-not-found';

/**
 * Controller responsável por lidar com requisições relacionadas a wallpapers.
 */
class WallpaperController {
  private wallpaperService: IWallpaperService;
  private tagService: ITagService;

  /**
   * @param wallpaperService - Serviço com a lógica de negócios para wallpapers
   * @param tagService - Serviço responsável por operações com tags
   */
  constructor(wallpaperService: IWallpaperService, tagService: ITagService) {
    this.wallpaperService = wallpaperService;
    this.tagService = tagService;
  }

  /**
   * Cria uma nova instância do controller WallpaperController
   * @param wallpaperService - Serviço de wallpapers
   * @param tagService - Serviço de tags
   * @returns Instância do controller
   */
  static createInstance(wallpaperService: IWallpaperService, tagService: ITagService): WallpaperController {
    return new WallpaperController(wallpaperService, tagService);
  }

  /**
   * Retorna a imagem em tamanho original a partir do ID fornecido
   * @param req - Objeto da requisição HTTP do Express, contendo o parâmetro `id`
   * @param res - Objeto de resposta HTTP do Express
   * @returns Resposta HTTP com a imagem original ou erro
   */
  getOriginalSize = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const original = await this.wallpaperService.getOriginalSize(id);
      res.status(200).json(original);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /**
   * Registra um novo wallpaper no sistema, associando as tags existentes com base nos IDs informados.
   * @param req - Objeto da requisição HTTP contendo os dados do wallpaper e os IDs das tags
   * @param res - Objeto de resposta HTTP do Express
   * @returns Resposta HTTP com o wallpaper criado ou erro
   */
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: RegisterWallpaper = req.body;

      const tagIds = dto.tagsIDs;

      const tags = await this.tagService.findAllByIds(tagIds);

      const created = await this.wallpaperService.register(dto, tags);

      res.status(201).json({ id: created });
    } catch (err) {
      if (err instanceof TagNotFound) {
        res.status(404).json({ error: err.message });
      }

      console.error('Error in wallpaper register controller:', err);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default WallpaperController;
