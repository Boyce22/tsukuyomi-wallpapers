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
 * Serviço para armazenamento no Backblaze B2 via API compatível com S3.
 * Implementa a interface IStorageService.
 */
class BackBlazeService implements IStorageService {
  private s3: S3Client;

  /**
   * Cria uma instância do serviço BackBlazeService.
   * Inicializa o cliente S3 configurado para Backblaze B2.
   */
  constructor() {
    this.s3 = this._build();
  }

  /**
   * Cria e retorna uma nova instância do serviço BackBlazeService.
   *
   * @returns {BackBlazeService} Nova instância do serviço.
   */
  static createInstance(): BackBlazeService {
    return new BackBlazeService();
  }

  /**
   * Inicializa a instância do S3 com as configurações do Backblaze B2.
   *
   * @private
   * @returns {S3Client} Instância configurada do cliente S3.
   * @throws {Error} Se alguma variável de ambiente necessária estiver ausente.
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
   * Cria um bucket no Backblaze B2.
   *
   * @param {string} name - Nome do bucket a ser criado.
   * @returns {Promise<void>} Promessa que resolve quando o bucket for criado.
   * @throws {Error} Caso ocorra falha na criação do bucket.
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
   * Recupera a lista de buckets disponíveis no Backblaze B2.
   *
   * @returns {Promise<string[]>} Promessa que resolve para uma lista de nomes de buckets.
   * @throws {Error} Caso ocorra falha ao listar os buckets.
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
   * Deleta um bucket inteiro ou um objeto específico dentro do bucket.
   *
   * @param {string} bucketName - Nome do bucket alvo da operação.
   * @param {string} [key] - (Opcional) Chave do objeto a ser deletado. Se omitido, o bucket será deletado.
   * @returns {Promise<void>} Promessa que resolve quando a operação for concluída.
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
   * @param {string} bucketName - Nome do bucket onde o arquivo será enviado.
   * @param {string} key - Caminho ou identificador único do arquivo dentro do bucket.
   * @param {Buffer} fileBuffer - Conteúdo do arquivo em formato Buffer.
   * @returns {Promise<void>} Promessa que resolve quando o upload for concluído.
   * @throws {Error} Caso o upload falhe.
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
