import type { Response, Request } from "express";
import type { IWallpaperService } from "@/_types/services/wallpapers";

/**
 * Controller responsável por lidar com requisições relacionadas a wallpapers.
 */
class WallpapersController {
  private service: IWallpaperService;

  /**
   * @param service - Instância do serviço que contém a lógica de negócios para wallpapers
   */
  constructor(service: IWallpaperService) {
    this.service = service;
  }

  /**
   * Cria uma nova instância do controller WallpapersController
   * @param service - Serviço de wallpapers com a lógica de negócios
   * @returns Instância do controller
   */
  static createInstance(service: IWallpaperService): WallpapersController {
    return new WallpapersController(service);
  }

  /**
   * Retorna a imagem em tamanho original a partir do ID fornecido
   * @param req - Objeto da requisição HTTP do Express, contendo o parâmetro `id`
   * @param res - Objeto de resposta HTTP do Express
   * @returns Resposta HTTP com a imagem original ou erro
   */
  getOriginalSize = async (req: Request, res: Response, next: unknown) => {
    try {
      const id = req.params.id;

      const original = await this.service.getOriginalSize(id);

      res.status(200).json(original)
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default WallpapersController;
