import { QualityCompress } from '@/_types/common/quality.enum';

/**
 * Parâmetros necessários para realizar a compressão de uma imagem
 */
export type ImageCompressParams = {
  /** Caminho absoluto da imagem original no sistema de arquivos */
  path: string;

  /** Qualidade desejada para a imagem comprimida */
  quality: QualityCompress;
};

/**
 * Resultado da operação de compressão de imagem
 */
export type CompressResult = {
  /** Dados da imagem original */
  original: {
    /** Caminho da imagem original */
    path: string;

    /** Tamanho da imagem original em bytes */
    size: number;

    buffer: Buffer;
  };

  /** Dados da imagem comprimida */
  compressed: {
    /** Caminho da imagem comprimida */
    path: string;

    /** Tamanho da imagem comprimida em bytes */
    size: number;

    
    buffer: Buffer;
  };
};

/**
 * Interface para o serviço de compressão de imagens
 */
export interface IImageCompressService {
  /**
   * Realiza a compressão de uma imagem com a qualidade especificada
   * @param {ImageCompressParams} params - Parâmetros contendo o caminho da imagem e a qualidade desejada
   * @returns {Promise<CompressResult>} Resultado contendo os caminhos e tamanhos da imagem original e da comprimida
   */
  compress({ path, quality }: ImageCompressParams): Promise<CompressResult>;
}
