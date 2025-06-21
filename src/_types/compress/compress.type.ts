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
 * Dados da imagem, contendo caminho, tamanho e conteúdo em buffer.
 *
 * @typedef {Object} ImageData
 * @property {string} path - Caminho da imagem.
 * @property {number} size - Tamanho da imagem em bytes.
 * @property {Buffer} buffer - Conteúdo da imagem em buffer.
 */
type ImageData = {
  path: string;
  size: number;
  buffer: Buffer;
};

/**
 * Resultado da operação de compressão de imagem, contendo
 * dados da imagem original e da imagem comprimida.
 *
 * @typedef {Object} CompressResult
 * @property {ImageData} original - Dados da imagem original.
 * @property {ImageData} compressed - Dados da imagem comprimida.
 */
export type CompressResult = {
  original: ImageData;
  compressed: ImageData;
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
   * @throws {Error} Caso ocorra falha na compressão ou o arquivo não seja encontrado.
   */
  compress(params: ImageCompressParams): Promise<CompressResult>;
}
