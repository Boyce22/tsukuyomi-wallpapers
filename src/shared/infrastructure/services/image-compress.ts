import path from 'path';
import sharp, { Sharp } from 'sharp';
import { ImageCompressionError } from '../../domain/exceptions/image-compression-error';
import { TImageCompressorService } from '../../application/ports/services/image-compressor';

import { QualityCompress } from '../../types/quality.enum';
import { UnsupportedImageFormatError } from '../../domain/exceptions/unsupported-image-format-error';

class ImageCompressService implements TImageCompressorService {
  private readonly formatMap: Record<string, (sharpInstance: Sharp, quality: QualityCompress) => Sharp> = {
    'image/jpeg': (instance, quality) => instance.jpeg({ quality }),
    'image/png': (instance, quality) => instance.png({ quality }),
    'image/webp': (instance, quality) => instance.webp({ quality }),
    'image/avif': (instance, quality) => instance.avif({ quality }),
  };

  async compress(
    image: Buffer,
    quality: QualityCompress,
    originalMimeType: string,
  ): Promise<{ buffer: Buffer; mimeType: string }> {
    try {
      const sharpInstance = sharp(image);
      const formatHandler = this.formatMap[originalMimeType];

      if (!formatHandler) {
        throw new UnsupportedImageFormatError(`Unsupported image format: ${originalMimeType}`);
      }

      const compressedBuffer = await formatHandler(sharpInstance.clone(), quality).toBuffer();
      const outputInfo = await sharpInstance.metadata();

      return { buffer: compressedBuffer, mimeType: `image/${outputInfo.format}` };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error(`Failed to compress image: ${errMsg}`);
      throw new ImageCompressionError('Failed to compress image. Verify the image format.');
    }
  }
}

export default ImageCompressService;
