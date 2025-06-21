import path from 'path';
import sharp, { Sharp } from 'sharp';
import { QualityCompress } from '@/_types/common/quality.enum';
import { CompressResult, IImageCompressService, ImageCompressParams } from '@/_types/compress/compress.type';

/**
 * Serviço responsável pela compressão de imagens em memória utilizando a biblioteca Sharp.
 * Implementa a interface IImageCompressService.
 */
class ImageCompressService implements IImageCompressService {
  /**
   * Cria uma nova instância do serviço de compressão de imagens.
   *
   * @returns {IImageCompressService} Nova instância do serviço.
   */
  public static createInstance(): IImageCompressService {
    return new ImageCompressService();
  }

  /**
   * Mapeamento entre extensões de arquivos e funções que aplicam compressão com qualidade via Sharp.
   *
   * @private
   * @type {Record<string, (sharpInstance: Sharp, quality: QualityCompress) => Sharp>}
   */
  private readonly formatMap: Record<string, (sharpInstance: Sharp, quality: QualityCompress) => Sharp> = {
    jpg: (instance, quality) => instance.jpeg({ quality }),
    jpeg: (instance, quality) => instance.jpeg({ quality }),
    png: (instance, quality) => instance.png({ quality }),
    webp: (instance, quality) => instance.webp({ quality }),
    avif: (instance, quality) => instance.avif({ quality }),
  };

  /**
   * Realiza a compressão da imagem no caminho especificado, aplicando o nível de qualidade solicitado.
   *
   * @param {ImageCompressParams} params - Parâmetros para a compressão.
   * @param {string} params.path - Caminho absoluto da imagem original.
   * @param {QualityCompress} [params.quality=QualityCompress.MEDIUM] - Nível de qualidade para compressão.
   * @returns {Promise<CompressResult>} Promessa que resolve com os dados da imagem original e comprimida.
   * @throws {Error} Lança erro se o formato da imagem não for suportado ou se a compressão falhar.
   */
  async compress({ path: imagePath, quality = QualityCompress.MEDIUM }: ImageCompressParams): Promise<CompressResult> {
    try {
      const extension = this._getExtension(imagePath);
      const formatFn = this.formatMap[extension];

      if (!formatFn) {
        throw new Error(`Unsupported image format: .${extension}`);
      }

      const sharpInstance = sharp(imagePath);

      const originalBuffer = await sharpInstance.clone().toBuffer();
      const compressedBuffer = await formatFn(sharpInstance.clone(), quality).toBuffer();

      return {
        original: {
          path: imagePath,
          size: originalBuffer.length,
          buffer: originalBuffer,
        },
        compressed: {
          path: `${imagePath}_compressed.${extension}`,
          size: compressedBuffer.length,
          buffer: compressedBuffer,
        },
      };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error(`Failed to compress image: ${errMsg}`);
      throw new Error('Erro ao comprimir imagem. Verifique o formato ou conteúdo do arquivo.');
    }
  }

  /**
   * Extrai a extensão do arquivo, em minúsculas e sem o ponto.
   *
   * @private
   * @param {string} filePath - Caminho do arquivo.
   * @returns {string} Extensão do arquivo (ex: "jpg", "png").
   */
  private _getExtension(filePath: string): string {
    return path.extname(filePath).replace('.', '').toLowerCase();
  }
}

export default ImageCompressService;
