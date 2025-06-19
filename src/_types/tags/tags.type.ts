import { Tag } from '@/models/tag';

/**
 * DTO (Data Transfer Object) para criação de uma nova tag
 */
export type CreateTag = {
  /** Nome da tag */
  name: string;

  /** Descrição da tag */
  description: string;
};

/**
 * Interface do repositório responsável pelas operações de acesso a dados da entidade Tag
 */
export interface ITagRepository {
  /**
   * Busca múltiplas tags pelo array de IDs fornecido
   * @param {string[]} ids - Lista de IDs das tags a serem buscadas
   * @returns {Promise<Tag[] | null>} Lista de tags encontradas ou null se nenhuma for encontrada
   */
  findAllByIds(ids: string[]): Promise<Tag[] | null>;

  /**
   * Registra uma nova tag no banco de dados
   * @param {CreateTag} dto - Dados para criação da tag
   * @returns {Promise<Tag>} A tag criada
   */
  register(dto: CreateTag): Promise<Tag>;
}

/**
 * Interface da camada de serviço responsável pela lógica de negócios relacionada a tags
 */
export interface ITagService {
  /**
   * Busca múltiplas tags pelo array de IDs fornecido
   * @param {string[]} ids - Lista de IDs das tags a serem buscadas
   * @returns {Promise<Tag[]>} Lista de tags encontradas
   * @throws {TagNotFound} Se uma ou mais tags não forem encontradas (dependendo da implementação)
   */
  findAllByIds(ids: string[]): Promise<Tag[]>;

  /**
   * Registra uma nova tag
   * @param {CreateTag} dto - Dados para criação da tag
   * @returns {Promise<string>} ID da tag criada
   */
  register(dto: CreateTag): Promise<string>;
}
