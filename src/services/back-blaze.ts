import { IStorageService } from '@/_types/storage/storage.type';

import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';

/**
 * Serviço responsável por interagir com o armazenamento da Backblaze B2
 * através da API compatível com o protocolo S3.
 *
 * Implementa a interface {@link IStorageService}.
 */
class BackBlazeService implements IStorageService {
  private s3: S3Client;

  /**
   * Cria uma nova instância de {@link BackBlazeService}.
   * Inicializa internamente o cliente S3 configurado para a Backblaze B2.
   *
   * @throws {Error} Se variáveis de ambiente obrigatórias estiverem ausentes.
   */
  constructor() {
    this.s3 = this._build();
  }

  /**
   * Cria uma nova instância estática de {@link BackBlazeService}.
   *
   * @returns {BackBlazeService} Instância do serviço configurada.
   */
  static createInstance(): BackBlazeService {
    return new BackBlazeService();
  }

  /**
   * Inicializa o cliente S3 com as configurações da Backblaze.
   *
   * @private
   * @returns {S3Client} Instância configurada do cliente S3.
   * @throws {Error} Se variáveis de ambiente necessárias estiverem ausentes.
   */
  private _build(): S3Client {
    const endpoint = process.env.B2_URL;
    const region = process.env.B2_REGION;
    const accessKeyId = process.env.B2_KEY_ID;
    const secretAccessKey = process.env.B2_SECRET_KEY;

    if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing Backblaze S3 configuration environment variables');
    }

    return new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
    });
  }

  /**
   * Cria um novo bucket na Backblaze B2.
   *
   * @param {string} name - Nome do bucket a ser criado.
   * @returns {Promise<void>} Promise resolvida quando a operação for concluída.
   * @throws {Error} Caso a criação do bucket falhe.
   */
  async createBucket(name: string): Promise<void> {
    try {
      await this.s3.send(new CreateBucketCommand({ Bucket: name }));
    } catch (error) {
      console.error(`Failed to create bucket "${name}":`, error);
      throw error;
    }
  }

  /**
   * Lista todos os buckets disponíveis no serviço Backblaze.
   *
   * @returns {Promise<string[]>} Lista de nomes de buckets.
   * @throws {Error} Caso a operação de listagem falhe.
   */
  async getBuckets(): Promise<string[]> {
    try {
      const { Buckets } = await this.s3.send(new ListBucketsCommand({}));

      if (!Buckets?.length) {
        console.warn('No S3 buckets found.');
        return [];
      }

      return Buckets.map((b) => b.Name).filter((name): name is string => !!name);
    } catch (error) {
      console.error('Failed to list buckets:', error);
      throw error;
    }
  }

  /**
   * Remove um bucket inteiro ou um objeto específico dentro dele.
   *
   * @param {string} bucketName - Nome do bucket alvo.
   * @param {string} [key] - (Opcional) Caminho do objeto a ser removido.
   * Se omitido, o bucket inteiro será deletado.
   * @returns {Promise<void>} Promise resolvida após a remoção.
   * @throws {Error} Caso a operação falhe.
   */
  async delete(bucketName: string, key?: string): Promise<void> {
    try {
      if (key) {
        await this.s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
      } else {
        await this.s3.send(new DeleteBucketCommand({ Bucket: bucketName }));
      }
    } catch (error) {
      console.error(`Failed to delete ${key ? `object "${key}"` : `bucket "${bucketName}"`}:`, error);
      throw error;
    }
  }

  /**
   * Realiza o upload de um arquivo para o bucket especificado.
   *
   * @param {string} bucketName - Nome do bucket de destino.
   * @param {string} key - Caminho único do objeto no bucket.
   * @param {Buffer} fileBuffer - Conteúdo do arquivo a ser enviado.
   * @returns {Promise<void>} Promise resolvida quando o upload for finalizado.
   * @throws {Error} Caso a operação falhe.
   */
  async upload(bucketName: string, key: string, fileBuffer: Buffer): Promise<void> {
    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: fileBuffer,
          ContentType: 'application/octet-stream',
        }),
      );
    } catch (error) {
      console.error(`Failed to upload file to bucket "${bucketName}" with key "${key}":`, error);
      throw error;
    }
  }
}

export default BackBlazeService;
