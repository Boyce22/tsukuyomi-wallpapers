import path from 'path';
import fs from 'fs/promises';
import sharp, { Sharp } from 'sharp';
import { QualityCompress } from '@/_types/common/quality.enum';
import { IImageCompressService, ImageCompressParams } from '@/_types/compress/compress.type';

type CompressResult = {
  original: { path: string; size: number };
  compressed: { path: string; size: number };
};

/**
 * Classe responsável por comprimir imagens dinamicamente com base na extensão do arquivo.
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
   * Comprime a imagem dinamicamente com base na extensão do arquivo de saída.
   *
   * @param {ImageCompressParams} params - Parâmetros para compressão da imagem.
   * @param {string} params.path - Caminho da imagem de entrada.
   * @param {string} params.outputPath - Caminho onde salvar a imagem comprimida.
   * @param {QualityCompress} [params.quality=QualityCompress.MEDIUM] - Nível de compressão.
   * @returns {Promise<CompressResult>} Promessa que resolve com os tamanhos dos arquivos original e comprimido.
   * @throws {Error} Se o formato da imagem não for suportado ou ocorrer erro na compressão.
   */
  async compress({ path, outputPath, quality = QualityCompress.MEDIUM }: ImageCompressParams): Promise<CompressResult> {
    try {
      const extension = this._getExtension(outputPath);
      const formatFn = this.formatMap[extension];

      if (!formatFn) {
        throw new Error(`Unsupported image format: ${extension}`);
      }

      const transformed = formatFn(sharp(path), quality);
      await transformed.toFile(outputPath);

      // Obtém o tamanho dos arquivos em bytes
      const originalStats = await fs.stat(path);
      const compressedStats = await fs.stat(outputPath);

      return {
        original: { path, size: originalStats.size },
        compressed: { path: outputPath, size: compressedStats.size },
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
