import { QualityCompress } from '@shared/types/quality.enum';

export type TImageCompressorService = {
  compress: (
    image: Buffer,
    quality: QualityCompress,
    originalMimeType: string,
  ) => Promise<{ buffer: Buffer; mimeType: string }>;
};
