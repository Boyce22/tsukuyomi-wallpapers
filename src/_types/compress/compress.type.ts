import { QualityCompress } from '@/_types/common/quality.enum';

export type ImageCompressParams = {
  path: string;
  outputPath: string;
  quality: QualityCompress;
};

type CompressResult = {
  original: { path: string; size: number };
  compressed: { path: string; size: number };
};

export interface IImageCompressService {
  compress({ path, outputPath, quality }: ImageCompressParams): Promise<CompressResult>;
}
