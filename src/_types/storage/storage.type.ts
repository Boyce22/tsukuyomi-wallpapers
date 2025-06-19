/**
 * Interface para serviços de armazenamento compatíveis com S3
 */
export interface IStorageService {
  /**
   * Cria um novo bucket no serviço de armazenamento
   * @param {string} name - Nome do bucket a ser criado
   * @returns {Promise<void>} Uma promessa que resolve quando o bucket for criado
   */
  createBucket(name: string): Promise<void>;

  /**
   * Deleta um bucket ou um objeto dentro de um bucket
   * @param {string} bucketName - Nome do bucket
   * @param {string} [key] - (Opcional) Chave do objeto a ser deletado. Se omitido, o bucket inteiro será deletado
   * @returns {Promise<void>} Uma promessa que resolve quando a operação for concluída
   */
  delete(bucketName: string, key?: string): Promise<void>;

  /**
   * Realiza o upload de um arquivo para um bucket
   * @param {string} bucketName - Nome do bucket de destino
   * @param {string} key - Caminho ou identificador único do arquivo dentro do bucket
   * @param {Buffer} fileBuffer - Conteúdo do arquivo em formato de buffer
   * @returns {Promise<void>} Uma promessa que resolve quando o upload for concluído
   */
  upload(bucketName: string, key: string, fileBuffer: Buffer): Promise<void>;
}
