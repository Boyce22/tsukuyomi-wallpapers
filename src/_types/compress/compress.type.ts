import { QualityCompress } from '@/_types/common/quality.enum';

/**
 * Parâmetros necessários para realizar a compressão de uma imagem.
 *
 * @typedef {Object} ImageCompressParams
 * @property {string} path - Caminho absoluto da imagem original no sistema de arquivos.
 * @property {QualityCompress} quality - Qualidade desejada para a imagem comprimida, conforme enumeração `QualityCompress`.
 */
export type ImageCompressParams = {
  path: string;
  quality: QualityCompress;
};

/**
 * Resultado da operação de compressão de imagem, contendo informações
 * da imagem original e da imagem comprimida.
 *
 * @typedef {Object} CompressResult
 * @property {Object} original - Dados da imagem original.
 * @property {string} original.path - Caminho da imagem original.
 * @property {number} original.size - Tamanho da imagem original em bytes.
 * @property {Buffer} original.buffer - Conteúdo da imagem original em formato Buffer.
 *
 * @property {Object} compressed - Dados da imagem comprimida.
 * @property {string} compressed.path - Caminho da imagem comprimida.
 * @property {number} compressed.size - Tamanho da imagem comprimida em bytes.
 * @property {Buffer} compressed.buffer - Conteúdo da imagem comprimida em formato Buffer.
 */
export type CompressResult = {
  original: {
    path: string;
    size: number;
    buffer: Buffer;
  };
  compressed: {
    path: string;
    size: number;
    buffer: Buffer;
  };
};

/**
 * Interface para o serviço de compressão de imagens.
 * Define o contrato para implementação de qualquer serviço
 * que realize compressão de imagens com qualidade ajustável.
 *
 * @interface IImageCompressService
 */
export interface IImageCompressService {
  /**
   * Realiza a compressão de uma imagem conforme os parâmetros especificados.
   *
   * @param {ImageCompressParams} params - Parâmetros da compressão, incluindo caminho da imagem e qualidade.
   * @returns {Promise<CompressResult>} Promessa que resolve com os dados da imagem original e comprimida.
   * @throws Pode lançar erro caso a compressão falhe ou o arquivo não seja encontrado.
   */
  compress(params: ImageCompressParams): Promise<CompressResult>;
}
