/**
 * Interface para serviços de armazenamento compatíveis com S3.
 * Define os métodos essenciais para gerenciamento de buckets e arquivos.
 *
 * @interface IStorageService
 */
export interface IStorageService {
  /**
   * Cria um novo bucket no serviço de armazenamento.
   *
   * @param {string} name - Nome do bucket a ser criado.
   * @returns {Promise<void>} Promessa que resolve quando o bucket for criado com sucesso.
   * @throws {Error} Caso ocorra falha na criação do bucket.
   */
  createBucket(name: string): Promise<void>;

  /**
   * Deleta um bucket inteiro ou um objeto específico dentro de um bucket.
   *
   * @param {string} bucketName - Nome do bucket alvo da operação.
   * @param {string} [key] - (Opcional) Chave do objeto a ser deletado.
   *                         Se não informado, o bucket completo será removido.
   * @returns {Promise<void>} Promessa que resolve quando a operação de exclusão for concluída.
   * @throws {Error} Caso o bucket ou objeto não exista ou a exclusão falhe.
   */
  delete(bucketName: string, key?: string): Promise<void>;

  /**
   * Realiza o upload de um arquivo para um bucket específico.
   *
   * @param {string} bucketName - Nome do bucket onde o arquivo será armazenado.
   * @param {string} key - Identificador único ou caminho do arquivo dentro do bucket.
   * @param {Buffer} fileBuffer - Conteúdo do arquivo a ser enviado, em formato Buffer.
   * @returns {Promise<void>} Promessa que resolve quando o upload for finalizado com sucesso.
   * @throws {Error} Caso o upload falhe.
   */
  upload(bucketName: string, key: string, fileBuffer: Buffer): Promise<void>;

  /**
   * Recupera a lista de todos os buckets disponíveis no serviço.
   *
   * @returns {Promise<string[]>} Promessa que resolve com um array contendo os nomes dos buckets existentes.
   * @throws {Error} Caso a listagem de buckets falhe.
   */
  getBuckets(): Promise<string[]>;
}
