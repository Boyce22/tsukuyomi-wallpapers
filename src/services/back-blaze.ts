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
 * Serviço para armazenamento no Backblaze B2 via API compatível com S3
 */
class BackBlazeService implements IStorageService {
  private s3: S3Client;

  /**
   * Cria uma instância do serviço BackBlazeService
   */
  constructor() {
    this.s3 = this._build();
  }

  static createInstance() {
    return new BackBlazeService();
  }

  /**
   * Inicializa a instância do S3 com as configurações do Backblaze B2
   * @private
   * @returns {S3Client} Instância configurada do S3
   * @throws {Error} Se variáveis de ambiente obrigatórias estiverem ausentes
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
    });
  }

  /**
   * Cria um bucket no Backblaze B2
   * @param {string} name - Nome do bucket
   * @returns {Promise<void>}
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
   * Deleta um arquivo (ou apenas o bucket, se `key` não for fornecido)
   * @param {string} bucketName - Nome do bucket
   * @param {string} [key] - Chave do arquivo a ser deletado (opcional)
   * @returns {Promise<void>}
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
   * Faz upload de um arquivo para o bucket especificado
   * @param {string} bucketName - Nome do bucket
   * @param {string} key - Caminho/identificador do arquivo
   * @param {Buffer} fileBuffer - Conteúdo do arquivo em buffer
   * @returns {Promise<void>}
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
