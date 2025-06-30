import path from 'path';
import sharp, { Sharp } from 'sharp';
import { ImageCompressionError } from '@/domain/exceptions/image-compression-error';
import { UnsupportedImageFormatError } from '@/domain/exceptions/unsupported-image-format-error';
import {
  CompressResult,
  IImageCompressService,
  ImageCompressParams,
} from '@/application/_types/compress/compress.type';

import { QualityCompress } from '../_types/common/quality.enum';

class ImageCompressService implements IImageCompressService {
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
        throw new UnsupportedImageFormatError(`Unsupported image format: .${extension}`);
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
      throw new ImageCompressionError('Failed to compress image. Verify the image format.');
    }
  }

  private _getExtension(filePath: string): string {
    return path.extname(filePath).replace('.', '').toLowerCase();
  }
}

export default ImageCompressService;
