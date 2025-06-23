import type { Request, Response } from 'express';
import { CreateUser, IUserService } from '@/_types/users/user.types';
import { IAuthService, IHashProvider } from '@/_types/auth/auth.type';

/**
 * Controller responsável por lidar com requisições relacionadas à entidade User.
 * Utiliza os métodos definidos em {@link IUserService}.
 */
class UserController {
    private readonly service: IUserService;

    private readonly authService: IAuthService;

    private readonly hashProvider: IHashProvider;

    /**
     * Cria uma nova instância do {@link UserController}.
     *
     * @param {IUserService} service - Instância do serviço responsável pela lógica de usuários.
     */
    constructor(service: IUserService, authService: IAuthService, hashProvider: IHashProvider) {
        this.service = service;
        this.authService = authService;
        this.hashProvider = hashProvider;
    }

    /**
     * Cria e retorna uma nova instância do {@link UserController}.
     *
     * @param {IUserService} service - Instância do serviço de usuários.
     * @returns {UserController} Nova instância do controller.
     */
    static createInstance(service: IUserService, authService: IAuthService, hashProvider: IHashProvider): UserController {
        return new UserController(service, authService, hashProvider);
    }

    /**
     * Endpoint responsável por registrar um novo usuário.
     *
     * @async
     * @param {Request} req - Objeto da requisição HTTP contendo os dados do novo usuário em `req.body`.
     * @param {Response} res - Objeto da resposta HTTP. Retorna mensagem de sucesso ou erro.
     * @returns {Promise<void>} Promise resolvida após o término da operação.
     * @throws {Error} Lança erro em caso de falha na validação ou persistência do usuário.
     */

    async register(req: Request, res: Response): Promise<void> {
        if (!req.file) {
            throw new Error('Photo is required');
        }

        const dto: CreateUser = req.body;

        const hashPassword = await this.hashProvider.hash(dto.password);

        const user = await this.service.register({ ...dto, password: hashPassword });

        const token = await this.authService.authenticate(user.email, user.password);

        res.status(201).json(token);
    }

    /**
      * Atualiza o nome do usuário a partir do ID fornecido
      * @param req - Objeto da requisição HTTP do Express, contendo `params.id` e `body.name`
      * @param res - Objeto de resposta HTTP do Express
      * @returns Resposta HTTP com o nome atualizado ou erro
      */
    async updateName (req: Request, res: Response, _next: unknown){
        try {
            const ids = req.params.id;
            const data = req.body;

            const updatedUser = await this.service.updateName(ids, { name: data.name });

            res.status(200).json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default UserController;

