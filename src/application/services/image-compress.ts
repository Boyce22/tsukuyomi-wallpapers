import path from 'path';
import sharp, { Sharp } from 'sharp';
import { QualityCompress } from '@/application/_types/common/quality.enum';
import { CompressResult, IImageCompressService, ImageCompressParams } from '@/application/_types/compress/compress.type';

class ImageCompressService implements IImageCompressService {
  public static createInstance(): IImageCompressService {
    return new ImageCompressService();
  }

  private readonly formatMap: Record<string, (sharpInstance: Sharp, quality: QualityCompress) => Sharp> = {
    jpg: (instance, quality) => instance.jpeg({ quality }),
    jpeg: (instance, quality) => instance.jpeg({ quality }),
    png: (instance, quality) => instance.png({ quality }),
    webp: (instance, quality) => instance.webp({ quality }),
    avif: (instance, quality) => instance.avif({ quality }),
  };

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

  private _getExtension(filePath: string): string {
    return path.extname(filePath).replace('.', '').toLowerCase();
  }
}

export default ImageCompressService;
