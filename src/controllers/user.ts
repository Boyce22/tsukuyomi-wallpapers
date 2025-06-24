import type { Request, Response } from 'express';
import { CreateUser, IUserService } from '@/_types/users/user.types';
import { IAuthService, IHashProvider } from '@/_types/auth/auth.type';
import { IImageCompressService } from '@/_types/compress/compress.type';
import { IStorageService } from '@/_types/storage/storage.type';
import { QualityCompress } from '@/_types/common/quality.enum';

/**
 * Controller responsável por lidar com requisições relacionadas à entidade User.
 * Utiliza os métodos definidos em {@link IUserService}, além de serviços auxiliares
 * para autenticação, hash de senhas, compressão de imagens e armazenamento.
 *
 * @class UserController
 */
class UserController {
  /**
   * Serviço que implementa a lógica de negócios para usuários.
   * @private
   */
  private readonly service: IUserService;

  /**
   * Serviço de autenticação responsável por gerar tokens JWT.
   * @private
   */
  private readonly authService: IAuthService;

  /**
   * Provedor de hash para senhas.
   * @private
   */
  private readonly hashProvider: IHashProvider;

  /**
   * Serviço para compressão de imagens.
   * @private
   */
  private readonly imageCompress: IImageCompressService;

  /**
   * Serviço para armazenamento de arquivos.
   * @private
   */
  private readonly storageService: IStorageService;

  /**
   * Nome do bucket onde as imagens de perfil serão armazenadas.
   * Obtido via variável de ambiente.
   * @private
   */
  private readonly bucket: string;

  /**
   * Cria uma nova instância do {@link UserController}.
   *
   * @param {IUserService} service - Instância do serviço responsável pela lógica de usuários.
   * @param {IAuthService} authService - Serviço de autenticação.
   * @param {IHashProvider} hashProvider - Provedor de hash para senhas.
   * @param {IImageCompressService} imageCompress - Serviço de compressão de imagens.
   * @param {IStorageService} storageService - Serviço de armazenamento de arquivos.
   *
   * @throws {Error} Caso a variável de ambiente para o bucket não esteja configurada.
   */
  constructor(
    service: IUserService,
    authService: IAuthService,
    hashProvider: IHashProvider,
    imageCompress: IImageCompressService,
    storageService: IStorageService,
  ) {
    this.service = service;
    this.authService = authService;
    this.hashProvider = hashProvider;
    this.imageCompress = imageCompress;
    this.storageService = storageService;
    this.bucket = this._resolveBucket();
  }

  /**
   * Cria e retorna uma nova instância do {@link UserController}.
   *
   * @param {IUserService} service - Instância do serviço de usuários.
   * @param {IAuthService} authService - Serviço de autenticação.
   * @param {IHashProvider} hashProvider - Provedor de hash para senhas.
   * @param {IImageCompressService} imageCompress - Serviço de compressão de imagens.
   * @param {IStorageService} storageService - Serviço de armazenamento de arquivos.
   * @returns {UserController} Nova instância do controller.
   */
  static createInstance(
    service: IUserService,
    authService: IAuthService,
    hashProvider: IHashProvider,
    imageCompress: IImageCompressService,
    storageService: IStorageService,
  ): UserController {
    return new UserController(service, authService, hashProvider, imageCompress, storageService);
  }

  /**
   * Endpoint responsável por registrar um novo usuário.
   *
   * Recebe dados via `req.body`, realiza hash da senha,
   * registra o usuário e gera um token JWT.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP contendo os dados do novo usuário em `req.body`.
   * @param {Response} res - Objeto da resposta HTTP. Retorna token JWT ou erro.
   * @returns {Promise<void>} Promise resolvida após o término da operação.
   * @throws {Error} Lança erro em caso de falha na validação ou persistência do usuário.
   */
  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    const hashPassword = await this.hashProvider.hash(dto.password);

    const user = await this.service.register({ ...dto, password: hashPassword });

    const token = await this.authService.authenticate(user.email, dto.password);

    res.status(201).json(token);
  }

  /**
 TSU-002
   * Atualiza o nome do usuário a partir do ID fornecido
   * @param req - Objeto da requisição HTTP do Express, contendo `params.id` e `body.name`
   * @param res - Objeto de resposta HTTP do Express
   * @returns Resposta HTTP com o nome atualizado ou erro
   */
  async updateName(req: Request, res: Response, _next: unknown) {
    try {
      const ids = req.params.id;
      const data = req.body;

      const updatedUser = await this.service.updateName(ids, { name: data.name });

      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

   * Endpoint para alterar a foto de perfil do usuário.
   *
   * Recebe arquivo enviado via multipart/form-data em `req.file`,
   * realiza compressão da imagem, faz upload para bucket configurado
   * e atualiza o caminho da imagem no cadastro do usuário.
   *
   * @async
   * @param {Request} req - Objeto da requisição HTTP, deve conter arquivo em `req.file` e `req.userId`.
   * @param {Response} res - Objeto da resposta HTTP. Retorna confirmação da atualização.
   * @returns {Promise<void>} Promise resolvida após o término da operação.
   * @throws {Error} Caso a foto não seja fornecida ou haja falha em compressão/upload/atualização.
   */
  async changeProfilePicture(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new Error('Photo is required');
    }

    const id = req.userId!;

    const { compressed: profilePicture } = await this.imageCompress.compress({
      path: req.file.path,
      quality: QualityCompress.MEDIUM,
    });

    const compressedPath = `profile-pictures/${id}/${req.file.filename}`;

    await this.storageService.upload(this.bucket, compressedPath, profilePicture.buffer);

    const response = await this.service.changeProfilePicture(id, compressedPath);

    res.status(200).json(response);
  }

  /**
   * Recupera o nome do bucket para armazenamento de imagens de perfil.
   *
   * @private
   * @returns {string} Nome do bucket obtido da variável de ambiente `STORAGE_PROFILE_PICTURE_BUCKET`.
   * @throws {Error} Caso a variável de ambiente não esteja configurada.
   */
  private _resolveBucket(): string {
    const bucket = process.env.STORAGE_PROFILE_PICTURE_BUCKET;
    if (!bucket) {
      throw new Error('Missing environment variable: STORAGE_PROFILE_PICTURE_BUCKET');
    }
    return bucket;
 develop
  }
}

export default UserController;
