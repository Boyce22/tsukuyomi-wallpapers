import { QualityCompress } from '@/_types/common/quality.enum';

export type ImageCompressParams = {
  path: string;
  quality: QualityCompress;
};

export type ImageBufferData = {
  path: string;
  size: number;
  buffer: Buffer;
};

export type CompressResult = {
  original: ImageBufferData;
  compressed: ImageBufferData;
};

export interface IImageCompressService {
  compress(params: ImageCompressParams): Promise<CompressResult>;
}
