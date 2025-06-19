import path from 'path';
import sharp, { Sharp } from 'sharp';
import { QualityCompress } from '@/_types/common/quality.enum';
import { CompressResult, IImageCompressService, ImageCompressParams } from '@/_types/compress/compress.type';

/**
 * Classe responsável por comprimir imagens dinamicamente com base na extensão do arquivo,
 * retornando buffers ao invés de salvar arquivos no disco.
 */
class ImageCompressService implements IImageCompressService {
  public static createInstance() {
    return new ImageCompressService();
  }

  /**
   * Mapeia extensões para os métodos de compressão do Sharp.
   * @private
   */
  private formatMap: Record<string, (sharpInstance: Sharp, quality: QualityCompress) => Sharp> = {
    jpg: (instance, quality) => instance.jpeg({ quality }),
    jpeg: (instance, quality) => instance.jpeg({ quality }),
    png: (instance, quality) => instance.png({ quality }),
    webp: (instance, quality) => instance.webp({ quality }),
    avif: (instance, quality) => instance.avif({ quality }),
  };

  /**
   * Comprime a imagem dinamicamente com base na extensão da imagem de entrada.
   *
   * @param {ImageCompressParams} params - Parâmetros para compressão da imagem.
   * @param {string} params.path - Caminho da imagem de entrada.
   * @param {QualityCompress} [params.quality=QualityCompress.MEDIUM] - Nível de compressão.
   * @returns {Promise<CompressResult>} Promessa que resolve com buffers e tamanhos dos arquivos original e comprimido.
   * @throws {Error} Se o formato da imagem não for suportado ou ocorrer erro na compressão.
   */
  async compress({ path, quality = QualityCompress.MEDIUM }: ImageCompressParams): Promise<CompressResult> {
    try {
      const extension = this._getExtension(path);
      const formatFn = this.formatMap[extension];

      if (!formatFn) {
        throw new Error(`Unsupported image format: ${extension}`);
      }

      // Buffer do arquivo original
      const originalBuffer = await sharp(path).toBuffer();
      const originalSize = originalBuffer.length;

      // Compressão
      const compressedBuffer = await formatFn(sharp(path), quality).toBuffer();
      const compressedSize = compressedBuffer.length;

      return {
        original: { path, size: originalSize, buffer: originalBuffer },
        compressed: { path: `${path}_compressed.${extension}`, size: compressedSize, buffer: compressedBuffer },
      };
      
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  }

  /**
   * Extrai a extensão do arquivo sem o ponto e converte para minúsculas.
   *
   * @param {string} filePath - Caminho do arquivo.
   * @returns {string} Extensão do arquivo em minúsculas.
   * @private
   */
  private _getExtension(filePath: string): string {
    return path.extname(filePath).replace('.', '').toLowerCase();
  }
}

export default ImageCompressService;
