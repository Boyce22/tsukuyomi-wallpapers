import { QualityCompress } from '@shared/types/quality.enum';

export type TImageCompressorService = {
  compress: (
    path: string,
    quality: QualityCompress,
    originalMimeType: string,
  ) => Promise<{ buffer: Buffer; mimeType: string }>;
};
